# How to auto spam Ds in teams
### `Step 1` Open DevTools
Simply press F11 (or Ctrl + Shift + I or just right click and select Inspect) and open whatever DevTools. Then, select the newtwork tab. It should look like this. <br><br>
![image](https://github.com/Relizc/relizc.github.io/assets/63401790/5e497f2b-084c-48f1-a9a2-0e7a8a103f5a)
___
### `Step 2` Send a random test message
After sending a message, there should be two new network records, called `message`. <br><br>
![image](https://github.com/Relizc/relizc.github.io/assets/63401790/0a15089f-5cf2-47e4-8d66-a86af40ec183) <br><br>
Click on the one with status code `201` and fancy stuff should show up. <br><br>
![image](https://github.com/Relizc/relizc.github.io/assets/63401790/405eba97-41ee-4741-a692-10731a7039ef) <br><br>
Your link should probably look something like this:
`https://apac.ng.msg.teams.microsoft.com/v1/users/ME/conversations/19%3AXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX%40unq.gbl.spaces/messages`<br>
Or in a group chat:
`https://apac.ng.msg.teams.microsoft.com/v1/users/ME/conversations/19%3AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX%40thread.v2/messages`<br><br>

And for the authencation code, it should look like this:
`skypetoken=bm90aGluZyBoZXJlIGxvbA`
___
### `Step 3` Copy the link and authencation key
There are two UUIDs, one representing your friend's, one representing yours, or in the group case, it is a dashless UUID representing the group ID. Simply copy this link and paste it into the `Request Link` textbox.<br><br>
![image](https://github.com/Relizc/relizc.github.io/assets/63401790/2b5710f2-f2c8-4bd9-ae42-8eed11c64e6e)<br><br>
And similar for the authencation key, which you can find it in the `Request Header` section if you scroll down, paste it in the Authencation Field. It should be a large chunk of base64 encoded string.<br><br>
![image](https://github.com/Relizc/relizc.github.io/assets/63401790/e5b387e7-3406-4c0a-96ec-4518e9295b60)<br><br>

___
### `Step 4` GO!
You are now done. If you would like to change how many times to send the message, change the Amount Field. Now Simply click `Start Requesting` and your messages will be sent!

