export function stripRank(name) {
    const rankNameRegex = /\[(?:MVP\+\+|MVP\+|MVP|VIP\+|VIP)\] (\S+)/;
    const nameMatch = name.match(rankNameRegex);
    return nameMatch ? nameMatch[1] : name.trim();
}

export function abbreviateWords(name) {
    let newName = name;
    if (name.includes('Enchanted')) newName = name.replace(/Enchanted/g, 'Ench.');
    return newName.removeFormatting();
}

export function truncateNumbers(amt) {  
    const cost = Number(amt.toString().replace(/,/g, ''));
    const formatNumber = (num) => {
        const fixedNum = num.toFixed(2);
        return fixedNum.endsWith('.00') ? num.toFixed(0) : fixedNum;
    };  

    switch (true) {
        case cost >= 1_000_000_000_000:
            return formatNumber(cost / 1_000_000_000_000) + 'T';
        case cost >= 1_000_000_000:
            return formatNumber(cost / 1_000_000_000) + 'B';
        case cost >= 1_000_000:
            return formatNumber(cost / 1_000_000) + 'M';
        case cost >= 1_000:
            return formatNumber(cost / 1_000) + 'K';
        case cost !== 1 && cost < 1_000:
            return cost.toString() + ' coins';
        default:
            return cost.toString() + ' coin';
    }
};

export function getInSkyblock() {
    if (!World.isLoaded()) return false;
    return ChatLib.removeFormatting(Scoreboard.getTitle()).includes("SKYBLOCK");
}

    export function getCurrArea() {
        if (!getInSkyblock()) return;
        let rawArea = '';
        TabList.getNames().forEach(line => {
            const fLine = line.removeFormatting();
            const areaMatch = fLine.match(/Area: (.+)/);
            if (areaMatch) rawArea = areaMatch[1];
        });
        return rawArea;
    }

export function getInHub() {
    return getCurrArea() === 'Hub';
}

export function replaceAuctionMessage(event, message, bypass=false) {
    cancel(event);

    if (Array.isArray(message)) {
        message.forEach(msg => {
            if (!bypass) ChatLib.chat(msg);
            if (bypass) msg.chat();
        });
    } else {
        if (!bypass) ChatLib.chat(message);
        if (bypass) message.chat();
    };
};

export function createClickable(fullMessage, linkMessage) {
    const titleMessage = `${fullMessage.trim()}&r&7! `;
    const linkObject = new TextComponent("&6&l[CLICK]").setClick("run_command", linkMessage);
    return new Message (
        titleMessage,
        linkObject 
    )
}   

export function getAuctionLinkFromEvent(event) {
    const messageParts = new Message(EventLib.getMessage(event)).getMessageParts();
    const auctionLink = messageParts[0].clickValue;
    return auctionLink;
}

register('command', () => { 
    //* you first
    ChatLib.simulateChat('&r&eYou collected &r&6400,000 coins &r&efrom selling &r&f&r&5Empty Thunder Bottle &r&eto &r&b[MVP&r&9+&r&b] XoutDragon &r&ein an auction!&r')
    ChatLib.simulateChat('&b[MVP&r&c+&r&b] oBiscuit&r&f &r&ecollected an auction for &r&6400,000 coins&r&e!&r')

    //* player first  
    ChatLib.simulateChat('&b[MVP&r&c+&r&b] oBiscuit&r&f &r&ecollected an auction for &r&6600,000 coins&r&e!&r')
    ChatLib.simulateChat('&r&eYou collected &r&6600,000 coins &r&efrom selling &r&f&r&5Empty Thunder Bottle &r&eto &r&b[MVP&r&9+&r&b] XoutDragon &r&ein an auction!&r')
    
    //* player only         
    ChatLib.simulateChat('&b[MVP&r&5++&r&b] Dompay&r&f &r&ecollected an auction for &r&61,970,100 coins&r&e!&r')
}).setName('ahclaimtest');                          

register('command', () => {
    ChatLib.simulateChat('&r&eYou claimed &r&f&r&9Glowstone Gauntlet &r&eback from your expired auction!&r')
    ChatLib.simulateChat('&b[MVP&r&c+&r&b] oBiscuit&r&f &r&ecollected an expired auction!&r')

    ChatLib.simulateChat('&b[MVP&r&c+&r&b] oBiscuit&r&f &r&ecollected an expired auction!&r')       
    ChatLib.simulateChat('&r&eYou claimed &r&f&r&7[Lvl 1] &r&6Zombie &r&eback from your expired auction!&r')

    ChatLib.simulateChat('&6[MVP&r&c+&r&b] Dompay&r&f &r&ecollected an expired auction!&r')     
}).setName('expired');  