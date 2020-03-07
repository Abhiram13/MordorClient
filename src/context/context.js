import React from 'react';

const Totalitems = React.createContext('');
const ItemProvider = Totalitems.Provider;
const ItemConsumer = Totalitems.Consumer;

export { ItemProvider, ItemConsumer };