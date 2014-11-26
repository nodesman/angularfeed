class FeedsController < ApplicationController
  before_action :set_feed, only: [:show, :edit, :update, :destroy]

  def index
    @feeds = Feed.all
  end

  def fetch
    @index = 0;
    subscriptions = JSON.parse(params[:data])
    final = []
    result = []
    for item in subscriptions
        if (item.is_a?(Hash))
          sub_list = item['items']
          new_subscriptions = []
          for subscription in sub_list do
            begin
              current_subscription_info = process_subscription(subscription)
            rescue Exception
              next
            end
            new_subscriptions.push(current_subscription_info)
          end
          item['items'] = new_subscriptions
          current = item.clone
        else
          begin
            current = process_subscription(item)
          rescue Exception
            next
          end
        end

      result.push(current)
    end
    render :text => JSON.dump(result)
  end

  def process_subscription(item)
    #make a request for the feed

    feed_data = Feedjira::Feed.fetch_and_parse item
    if (!defined? feed_data.url)
      raise Exception
    end

    result = {
        :name => feed_data.title,
        :url => feed_data.feed_url,
        :type => "feed",
        :items => []
    }

    for entry in feed_data.entries do

      current = {
          title: entry.title,
          url: entry.url,
          body: entry.summary,
          date: entry.published.to_i,
          uuid: @index
      }
      @index = @index + 1
      result[:items].push(current)
    end
    result
  end

  def show

  end

  def collage
    render :layout => "empty", :partial => "panels"
  end

  def item
    render :layout=> "empty", :partial => "viewitem"
  end

end
