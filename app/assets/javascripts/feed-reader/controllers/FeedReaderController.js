(function() {

  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedReaderController", ["$scope", "$rootScope", "$subscriptionService", "$http", function ($scope, $rootScope, $subscriptionService, $http) {

    $scope.networkError = false;

    $scope.$on("renderItem", function($event, $item) {
        //TODO: Implement render item
    });

    $scope.$on("collage", function() {
      //TODO: Implement consolidated list of feed items
    });

    $scope.$on("showItem", function($event, $item) {
      //TODO: Implement the viewing of the individual post in the full screen panel
    });

    function groupPostsByDate(posts) {


      function datesInPosts() {
        var dates = _.map(posts, function(item) {
          return (new Date(item.date * 1000)).setHours(0, 0, 0, 0) / 1000;
        });
        var unique_dates = _.uniq(dates);
        return unique_dates;
      }

      var dates = datesInPosts();
      var groups = [];
      for (var iter = 0; iter < dates.length; iter++) {

        var current = {
          date: dates[iter],
          items: []
        };

        current.items = _.filter(posts, function(item) {
          var currentdate = new Date(current.date * 1000);
          var itemdatewithouthours = new Date(item.date * 1000).setHours(0, 0, 0, 0);
          return (currentdate.getTime() === itemdatewithouthours)
        });
        groups.push(current);
      }

      groups = _(_.sortBy(groups, function(item) {
        return item.date;
      })).reverse().value();
      return groups;
    }

    $scope.$on("collage", function() {
      $rootScope.$broadcast("renderFeed", allCombined());
    });

    var allCombined = function() {
      var combined = [];
      var baseData = $scope.data;

      for (var iter=0;iter< baseData.length;iter++) {
        var current = baseData[iter];
        if ("folder" === current.type) {
          for (var j=0 ; j < current.items.length ; j++) {
            combined = combined.concat(current.items[j].items);
          }
        }
        else {
          combined = combined.concat(current.items);
        }
      }

      var posts = groupPostsByDate(combined);
      //var allFeedsCombined = [
      //  {
      //    date: 1416653451,
      //    items: [
      //      {
      //        title: "This is a test title",
      //        body: "This is the test body",
      //        favicon: "http://www.w3.org/2008/site/images/favicon.ico",
      //        site: "Site name",
      //        time: 1416653451,
      //        uuid: 1
      //      }
      //    ]
      //  },
      //  {
      //    date: 1416353351,
      //    items: []
      //  }
      //];
      return posts;
    };

    $rootScope.getPost = function($id) {
      return {
        site: "Smashing Magazine",
        url: "http://www.smashingmagazine.com/2014/11/18/the-state-of-animation-2014/",
        id: 1,
        favicon: "http://media.mediatemple.netdna-cdn.com/wp-content/themes/smashing-magazine/images/favicon.png",
        title: "The State Of Animation 2014",
        body: "<p>Should designers be able to code? This topic never seems to die, with its endless blog posts, Twitter discussions and conference talks. But the developer’s involvement in the design process seems to be addressed very little. This is a shame, because <strong>developers have a huge amount to add to discussions about design</strong>.</p> <p>The unfortunate truth is that many designers have a somewhat elitist attitude towards design. They believe that only they can come up with good design ideas. That is simply not true.</p> <p>Everybody has the ability to make good design suggestions, including developers. Admittedly, a trained designer will probably be more effective at finding design solutions. But that does not mean others should not contribute. As designers, we need to swallow our pride and accept contributions from everybody. For that reason alone, we should include developers in the conversation.</p> <h4>The Dangers Of Not Including The Developer</h4> <p>Back in the heyday of Digg, I remember a conversation between Daniel Burka (Digg’s lead designer) and Joe Stump (its lead developer). They told a story of a design change to the Digg button that Daniel wanted to introduce. From Daniel’s perspective, the change was minor. But upon speaking with Joe, he discovered that this minor design change would have a huge impact on website performance, forcing Digg to upgrade its processing power and server architecture.</p> <p>This is the problem when developers are not involved in design. It can be disastrous. <strong>It can lead to designs that are impossible to build</strong>, designs that introduce unnecessary technical complications, endless back and forth between the designer and developer as they struggle to fix problems created by the designer, wasted days of revision and iteration — all because the developer wasn’t consulted.</p> <p>Consider also the client’s perception of this mess. The client has signed off on the design, only to be told later that it cannot be built. That reflects poorly on everyone. This is why we need the developer’s involvement in design decisions. The decisions we make as designers have far greater ramifications than we are aware of.</p> <figure><a href=\"https://www.flickr.com/photos/opensourceway/5320589774\"><img src=\"http://media.mediatemple.netdna-cdn.com/wp-content/uploads/2014/10/process-opt.jpg\" alt=\"By including the developer in these decisions, we avoid wasted hours of work on something that is not cost-effective to build.\" title=\"By including the developer in these decisions, we avoid wasted hours of work on something that is not cost-effective to build.\" width=\"500\" height=\"281\" /></a><sup class=\"po\" id=\"note-1\"><a href=\"#1\">1</a></sup><figcaption>By including the developer in these decisions, we avoid wasted hours of work on something that is not cost-effective to build. (<a href=\"https://www.flickr.com/photos/opensourceway/5320589774\">Image credit</a><sup class=\"po\" id=\"note-2\"><a href=\"#2\">2</a></sup>)</figcaption></figure> <h4>The Developer Can Improve Our Understanding Of What Is Possible</h4> <p>But we need developers not only to block infeasible ideas. They might also suggest ideas that we’ve dismissed as impossible. We sometimes filter our own ideas because of the limitations of our technical knowledge, especially if we do some coding ourselves. We figure that if we cannot think of how to build an idea, then it cannot be possible.</p> <p>Sure, developers will sometimes resist our ideas. But other times they will build on them and take them further than we ever thought they could go. I have been in discussions with developers who proposed things I didn’t even know were possible. Without having them in the room, I would have missed out on those insights.</p> <p>What’s more, I learned through the process. By working closely with developers, my understanding of development has increased. I remain a specialist in design, but my knowledge of development has increased, making me more of a generalist. And, as I have written before, <a href=\"http://www.smashingmagazine.com/2011/07/26/defending-the-generalists-in-the-web-design-industry/\">being a generalist is no bad thing</a><sup class=\"po\" id=\"note-3\"><a href=\"#3\">3</a></sup>.</p> <h4>Developers Make Design Decisions All The Time</h4> <p>The biggest reason, though, for involving developers is that they will end up making design decisions anyway. The truth is that, as a developer delves into building a project, they will have to <strong>make decisions that affect and refine the design</strong>. Designers rarely have the time to consider all nuances of a website. The rest fall to the developer.</p> <p>By involving the developer in the initial design discussions, they will be in a better position to fill in the blanks. And when compromises in the design must be made, they will be in a better position to make those calls.</p> <h4>The Developer Will Have A Greater Sense Of Ownership</h4> <p>There is one final reason for including the developer in the process: They will feel more engaged with the project. Too often, developers are at the end of a long chain of decision-making. Their voice isn’t heard because they’re brought into the process far too late. This leaves them feeling no ownership over the project. By bringing them in earlier, they will feel more connected to the work and more appreciated, too.</p> <p>The question, then, is how do you include the developer in the process?</p> <h4>So, What Are You Waiting For?</h4> <p>Involving a developer in the design process is not rocket science. It comes down to inviting them to any design sessions that take place.</p> <p>Get them involved in the design exercises you do with clients. Encourage them to sit in on at least some of your usability testing sessions, and involve them right from the beginning of the project. <strong>The earlier you do it, the more you will benefit.</strong> In particular, show them your design work early on, before the client sees it. Too often, a client will sign off on a design and then the developer will discover that it cannot be built! That puts you in the embarrassing position of having to backtrack with the client.</p> <p>Of course, the more meetings the developer attends, the less coding they will get done. We must find a balance. <strong>A few meetings are worth it</strong> if delays are avoided down the line.</p> <p>There is another thing you can do that won’t eat into the developer’s time. Put the designer’s and developer’s desks side by side. My agency’s designers and developers sit beside each other and are always commenting on each other’s work. When a developer is able to look over at the designer’s screen, you can be sure they will speak up if they don’t like what they see!</p> <p>In the end, this is all about breaking down the barriers between roles and <strong>encouraging more collaborative work</strong>, not just between designer and developer but between workers in all disciplines. The more we understand what our colleagues do and the less precious we are about our own discipline, the better the result will be.</p> <p>Excluding the developer from the design process will do nothing but prevent the project from living up to its potential. In fact, excluding anyone — whether copywriter or SEO specialist — will ultimately compromise our work.</p> <p>Thoughts?</p> <p><em>(al, il)</em></p> <h4 class=\"po\">Footnotes</h4><ol class=\"po\"><li id=\"#1\"><a href=\"#note-1\">1 https://www.flickr.com/photos/opensourceway/5320589774</a></li><li id=\"#2\"><a href=\"#note-2\">2 https://www.flickr.com/photos/opensourceway/5320589774</a></li><li id=\"#3\"><a href=\"#note-3\">3 http://www.smashingmagazine.com/2011/07/26/defending-the-generalists-in-the-web-design-industry/</a></li></ol><p>The post <a rel=\"nofollow\" href=\"http://www.smashingmagazine.com/2014/11/21/why-you-should-include-your-developer-in-the-design-process/\">Why You Should Include Your Developer In The Design Process</a> appeared first on <a rel=\"nofollow\" href=\"http://www.smashingmagazine.com\">Smashing Magazine</a>.</p>"
      }
    };

    var subscriptionInfo = $subscriptionService.getSubscriptionsRaw();
    var $responsePromise = $http.post("/fetch",{ data: subscriptionInfo });

    $responsePromise.success(function(data) {
        $rootScope.data = data;
        $rootScope.$broadcast("renderFeed", allCombined());
    });

    //TODO: handle the error condition for when the request fails.

    $rootScope.$watch(function() {
      return $rootScope.data;
    }, function (newValue) {
      //$subscriptionService.setData(newValue);
    });

  }]);
})();