var path = require("path");

var friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        //push user data to the friends.js array of objects
        friendsData.push(req.body);
        //empty array to store each of the differences after calculation
        var finalDifferences = [];
        //loop through friendsData, not counting the newest results
        for (var i = 0; i < friendsData.length-1; i++) {
            var totalDifference = 0;
            //store the scores user sent as a variable
            var newResults = req.body.scores;
            console.log(`new scores: ${newResults}`);
            //store the scores for each previous friend as variable
            var results = friendsData[i].scores;
            console.log(`Arrays for each friend: ${results}`);
            //compare scores, calculate the difference
            for (var j = 0; j < results.length; j++) {
                var difference = Math.abs(newResults[j] - results[j]);
                console.log(`Difference: ${difference}`);
                totalDifference += difference;
                console.log(`Total difference: ${totalDifference}`);
                
            }
            finalDifferences.push(totalDifference);
                console.log(`Final differences: ${finalDifferences}`);
        }

        var matchScore = Math.min.apply(null, finalDifferences);

        console.log(`Match score: ${matchScore}`);

        for (i = 0; i < finalDifferences.length; i++) {
            if (matchScore === finalDifferences[i]) {
                console.log(`Match found! Index ${i}`);
                return;
            }
        }

        

    });
}