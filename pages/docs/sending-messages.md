---
title: Sending Messages
section: docs
layout: two-column
---

# Sending Messages

Smooch allows you to send text, images and [structured](/docs/structured-messages/) messages to your users. Each message you send will become part of the conversation between your user and your business system.

You can communicate with your customers using your favourite business system with our existing [integrated business systems](https://app.smooch.io/integrations/categories/business-systems).

Alternatively, you can use the Smooch API to send messages from within your own software.

## Sending Text Messages with the API

In order to send a message to a user, you'll need the user's ID. Typically, you'll obtain this from the [webhook that delivers a user's message to your software](/docs/receiving-messages), but you can also get this ID by [manually creating](/docs/creating-users) users.

With the user ID in hand, you can easily send a simple text message:

```javascript
smooch.appUsers.sendMessage('APP_USER_ID', {
    type: 'text',
    text: 'Hello, world!',
    role: 'appMaker',
    name: 'Business Man',
    email: 'boss@business.com'
}).then(() => {
    // async code
});
```

In the code above, `text` contains the message payload, while `name` and `email` are optionally used to identify the "sender" of the message and displayed to the user receiving the message. Smooch uses the email parameter to look up and provide an avatar for the message sender using [gravatar](http://gravatar.com), if one is available.

To learn more about the various parameters of this API, read its [reference documentation](http://docs.smooch.io/rest/#post-message).

## Sending Typing Activity with the API

In some cases, user experience in a conversation can be improved by letting the user know that "typing" is in progress and that a message will soon be on its way. Smooch provides a convenient API that you can use to signal these events to messaging channels that support this feature.

```javascript
smooch.appUsers.typingActivity('APP_USER_ID', {
  type: 'typing:start'
}).then(() => {
    // async code
});
```

When you call this function with 'typing:start', a typing activity indicator will be displayed on the supported customer channel. To cancel it, call 'typing:stop'. Alternatively, the indicator will be stopped the moment you send another message on the channel. You can read more about this function, and its behaviour in the [API reference](http://docs.smooch.io/rest/#typing-activity).

## Next Steps

Once you're able to send text messages to users with Smooch, move on to sending structured messages that can significantly enrich the conversation experience.

 * [Send structured messages](/docs/structured-messages/) using the Smooch API to any messaging channel.
 * Take advantage of convenient [shorthand](/docs/sending-images-and-buttons-shorthand) for sending images and buttons from any business system.
