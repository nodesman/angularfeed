class FeedsController < ApplicationController
  before_action :set_feed, only: [:show, :edit, :update, :destroy]

  def index
    @feeds = Feed.all
  end

  def fetch
    render :layout=>"empty", :partial => "feeds/json"
    ;
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
