'use strict';

const Git = require('nodegit');
const config = require('./js/config.js');

let s = new sigma('graph-container');

Git.Repository.open(config.repository)
    .then((repo) => {
        return repo.getMasterCommit();
    })
    .then((firstCommitOnMaster) => {
        let history = firstCommitOnMaster.history();
        let count = 0;
        history.on("commit", (commit) => {
            s.graph.addNode({
                id: commit.sha(),
                label: commit.message(),
                x: 0,
                y: count * 150,
                size: 1,
                color: '#00E4FB'
            });
            count++;
        });
        history.start();
    });
