module.exports = {
   name: "SimpleWelcomeMessage",
   desc: "Sends a welcome DM to user who joins guild.",
   author: "Holinhed",
   version: "1.0",
   event: "guildMemberAdd",
   payload(api, member){
      let output = "***Welcome to Camp Snoopy!***\nBelow we have some rules we expect all of our members to follow.\n\n";
      output += "- Ideally be active at least once per day.\n";
      output += "- At the end of each season, have a combined total of 1,000 donations and requests.\n";
      output += "- Clan games final score is (TH level * 1000).\n";
      output += "- Be a member of the discord server using your ingame name.\n";
      output += "- DO NOT RUSH!\n\n";

      output += "**Donations**\n";
      output += "- Our clan is level 14. Meaning all troops go up 2 levels.\n";
      output += "- FILL DONATION REQUESTS PRIOR TO REQUESTING YOURSELF\n";
      output += "- We do not expect TH9 and LOWER to donate.\n";
      output += "- At the end of the season, we review all donations for all members.\n";
      output += "- We will add your donations and troops received and that number must be above 1000.\n";
      output += "- For TH10+, we will also check your donation ratio. And that ratio must not drop below 0.1.\n\n";

      output += "**Clan Games**\n";
      output += "- It is expected for all members to participate in CG.\n";
      output += "- Failure to participate in CG may remove you from wars, CWL, and the clan.\n\n";
      
      output += "**War Participation**\n";
      output += "- We want to see you in the clan for 1-2 weeks before being included in war.\n";
      output += "- If (any) heroes are upgrading, set your preference to red.\n";
      output += "- If you war in war, use Discord and clan mail for atack directions.\n";
      output += "- The higher your number in war, the earlier you need to attack.\n";
      output += "- Failure to attack and/or not following directions repeatedly will remove you from the clan.\n\n";

      output += "**Promotions**\n";
      output += "All promotions are based on participation. Donations, war participation, skill level, clan games score, chat activity, and need to additional elders and co's.\n\n";

      output += "**CWL**\n";
      output += "CWL is a reward. Only trusted and reliable players get included. We do 15v15s, and try to rotate as many as possible.\n\n";

      output += "We are here to have fun. None of the leaders want to be the \"Clan Police\", we want to attack, build our bases, and have fun.\n";
      output += "But (heeh heeh, Beavis, he said butt) as clan leaders we have a duty (heh heh... he said doody) to create an active, balanced clan without drama and leaches.\n\n";

      output += "If you are comforable with our expectations of each member... Welcome to Camp Snoopy!\n";

      member.send(output);
   }
};