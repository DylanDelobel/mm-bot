// ==UserScript==
// @name         Bot for MM
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       DylanDelobel
// @match        https://www.mintopoly.io/dashboard
// @icon         https://www.google.com/s2/favicons?domain=mintopoly.io
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DylanDelobel/mm-bot/master/mm-bot.user.js
// @updateURL    https://raw.githubusercontent.com/DylanDelobel/mm-bot/master/mm-bot.user.js
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function () {
    'use strict';
    let execCount = 0;
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

    function getCurrentCashBalance() {
        let cashtxt = $('p:contains("cash balance")')[0];
        let balance = $(cashtxt).parent().find('h3')[0];
        return Number($(balance).text());
    }

    function stack(amountToStack) {
        let depoSlider = $('span.MuiSlider-track')[0];
        let depoInput = $(depoSlider).next('input');
        $(depoInput).val(amountToStack);
        //$("button:contains('deposit')")
    }

    function canIStack() {
        let stackMsg = $('span:contains("You can stake again in...")');
        if (stackMsg.length === 1) {
            return false;
        }
        return true;
    }


    setInterval(() => {
        // ===== Setup
        execCount++;
        console.log("Executed " + execCount + " times");
        if (execCount === 250) {
            location.reload()
        }

        let totalBought = 0;
        for (const [key, val] of Object.entries(Investments)) {
            val.count = getCountOfInvestments(val.name);
            totalBought += val.count;
        }

        // if (totalBought > 450) {
        //     // check if I can stack
        //     if (canIStack()) {
        //         stack(getCurrentCashBalance());
        //         //location.reload();
        //     }
        // }

        // ===== Logic
        if (Investments.centralizedExchange.count < 48) {
            buyOneInvestments(Investments.centralizedExchange.name);
        }
        if (Investments.decentralizedExchange.count < 40) {
            buyOneInvestments(Investments.decentralizedExchange.name);
        }
        if (Investments.automatedTradingBot.count < 46) {
            buyOneInvestments(Investments.automatedTradingBot.name);
        }
        if (Investments.smartContract.count < 45) {
            buyOneInvestments(Investments.smartContract.name);
        }
        if (Investments.oracle.count < 63) {
            buyOneInvestments(Investments.oracle.name);
        }
        if (Investments.validatorNode.count < 67) {
            buyOneInvestments(Investments.validatorNode.name);
        }
        if (Investments.miningRig.count < 130) {
            buyOneInvestments(Investments.miningRig.name);
        }
    }, 4000 + getRandomInt(1000));
})();
