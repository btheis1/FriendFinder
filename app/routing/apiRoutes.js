var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        //empty variable to hold best match
        var finalMatch = {
            name: "",
            image: "",
            friendDifference: Infinity
        };
        
        var userData = req.body;
        var userScores = userData.scores;
        var totalDifference;

        //loop through friendsData, not counting the newest results
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            var totalDifference = 0;
            console.log(currentFriend.name);
            
            //compare scores, calculate the difference
            for (var j = 0; j < currentFriend.scores.length; j++) {

                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];
                var difference = Math.abs(parseInt(currentUserScore) - currentFriendScore);

                totalDifference += difference;
                
            }

            if(totalDifference <= finalMatch.friendDifference) {
                finalMatch.name = currentFriend.name;
                finalMatch.image = currentFriend.image;
                finalMatch.friendDifference = totalDifference;
            }
            
        }

        //push user data to the friends.js array of objects
        friends.push(userData);

        res.json(finalMatch);
    });
};