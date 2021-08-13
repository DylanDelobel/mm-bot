// ==UserScript==
// @name         Bot for MM
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       DylanDelobel
// @match        https://www.mintopoly.io/dashboard
// @icon         https://www.google.com/s2/favicons?domain=mintopoly.io
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DylanDelobel/mm-bot/master/mm-bot.user.js
// @updateURL    https://raw.githubusercontent.com/DylanDelobel/mm-bot/master/mm-bot.user.js
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function () {
    'use strict';
    let miningRig, validatorNode, oracle, smartContract
    let Investments = {
        miningRig: {'name': 'Mining Rig'},
        validatorNode: {'name': 'Validator Node'},
        oracle: {'name': 'Oracle'},
        smartContract: {'name': 'Smart Contract'},
        automatedTradingBot: {'name': 'Automated Trading Bot'},
        decentralizedExchange: {'name': 'Decentralized Exchange'},
        centralizedExchange: {'name': 'Centralized Exchange'},
    };

    // ===== Functions
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function getCountOfInvestments(name) {
        let regExp = /\(([^)]+)\)/;
        let invest = $('h4:contains("' + name + '")')
        let match = regExp.exec(invest.text());

        if (match === null) {
            return 0;
        }
        return Number(match[1]);
    }

    function buyOneInvestments(name) {
        switch (name) {
            case 'Mining Rig':
                $('button.btn-orange').click();
                break;
            case 'Validator Node':
                $('button.btn-purple').click();
                break;
            case 'Oracle':
                $('button.btn-blue').click();
                break;
            case 'Smart Contract':
                $('button.btn-green').click();
                break;
            case 'Automated Trading Bot':
                $('button.btn-yellow').click();
                break;
            case 'Decentralized Exchange':
                $('button.btn-pink')[2].click();
                break;
            case 'Centralized Exchange':
                $('button.btn-white').click();
                break;
            default:
                console.log('Not exist');
        }
    }


    setInterval(() => {
        // ===== Setup
        console.log('setup');
        for (const [key, val] of Object.entries(Investments)) {
            val.count = getCountOfInvestments(val.name);
            console.log(val);
        }

        // ===== Logic
        if (Investments.miningRig.count < 50) {
            buyOneInvestments(Investments.miningRig.name);
        }
        if (Investments.validatorNode.count < 40) {
            buyOneInvestments(Investments.validatorNode.name);
        }
        if (Investments.oracle.count < 30) {
            buyOneInvestments(Investments.oracle.name);
        }
        if (Investments.smartContract.count < 25) {
            buyOneInvestments(Investments.smartContract.name);
        }
        if (Investments.automatedTradingBot.count < 20) {
            buyOneInvestments(Investments.automatedTradingBot.name);
        }
        if (Investments.decentralizedExchange.count < 15) {
            buyOneInvestments(Investments.decentralizedExchange.name);
        }
        if (Investments.centralizedExchange.count < 50) {
            buyOneInvestments(Investments.centralizedExchange.name);
        }

    }, 4000 + getRandomInt(1000));
})();
