---
# sidebar_position: 1
# sidebar_label: Reactor
displayed_sidebar: reactorSidebar
---
# Reactor Intro

Powerhouse creates real-time collaboration environments to enable contributors from around the world to work simultaneously on any type of document. The two key technologies that make this possible are [Document Models](docs/connect/Document%20Models/intro.md). and *DocSync*. Document models are the common design pattern that is used for all documents and files, and DocSync is a decentralized synchronization protocol that is storage agnostic.

:::info 
**Document Models** are _what_ is synced and **DocSync** is _how_ document models are synced. 
But who is doing the syncing? We call these participants Reactors.
::: 

Powerhouse Reactors are the nodes in the network that store documents, resolve conflicts and rerun operations to verify document event histories. Reactors can be configured for local storage, centralized cloud storage or on a decentralized storage network.

The DocSync protocol *sends updates from one reactor to another* - smashing document operations into one another - to ensure all data is synced.

A reactor is responsible for storing data and resolving merge conflicts. Editing data and submitting new operations must be done through Powerhouse’s native applications (Connect, Switchboard, Fusion). Each instance of these applications contains a Reactor that is responsible for storing data and syncing data through DocSync. In other words, Powerhouse applications are how Reactors can be accessed, manipulated, steered, visualized and modified. A local Connect desktop application’s reactor can therefore sync with the Reactor of a remote drive (e.g. Switchboard instance). 

## Configuring your reactor
 
In addition to the choice of storage, Reactors also have other configurations. The operational data and read models associated with the document models inside a reactor allow to query the gathered data inside a document model or quickly visualize the crucial insights at a glance. Listeners, which continuously listen to any changes in a document model, help us to connect additional tools such as codegenerators and scripts to the reactors and the document models it holds

Jump to: Configure a listener for your reactor and add a codegenerator

## Reactors on a Powergrid 

Imagery and explainers to be added

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apps Layer" default>
    <img src={require('@site/static/img/Powerhouse Website Layer.png').default} />
  </TabItem>
  <TabItem value="orange" label="Storage Layer">
     <img src={require('@site/static/img/Powerhouse Website Storage Layer.png').default} />
  </TabItem>
</Tabs>