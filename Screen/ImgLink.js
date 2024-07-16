import React from 'react';
import { WebView } from 'react-native-webview';

const WebPage = () => {
  return (
    <WebView
      source={{ uri: 'https://postimages.org/' }} // Replace 'https://example.com' with the URL of the web page you want to display
    />
  );
};

export default WebPage;
