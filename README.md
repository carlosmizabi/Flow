# Flow
A react flux inspired library as a thin layer on top of Rx to facilitate the construction of "shape-shifting" architectures.

Based on the ideas of React Flux with uni directional messaging flowing. 

####Stages

**Flow**, provides a **Stage** in which system entities can dispatch **Signals** that other sytem entities can listen for. In essence it is a communication system that allow decoupling of system entities from one another. These allows modules to be easily added or removed from the system without necessary breaking the whole system. By providing a few primitive components (i.e., actions, signals, signallers, actors, messsages, watchers), that reinforce a simple but "solid" structure, the system can "shape-shift" more easily. A system can be easly subdivided into further stages. For example, a stage for the View layer, a stage for the data layer, and a stage for whole application. However, this should not be a dogma for inter-components comunication. If a system entity is better suited to be direclty connected/coupled with another entity then so be it. Having said that, **Flow** offers the unidirectional event flow as proposed by react's flux with the added feature of enabling decoupling of components. New components can be added to take advantage of the current system easily and current ones can also be replaced easily. A possible analogy would be a mail delivery system but a better analogy is something like twitter where users tweet "signals" on to twitter which are filtered to their "tweeting channel", other users can then subscribe to those tweets and react to those. 


####Actions

**Actions** are simply unique identifiers on a **Stage** that represent an event on the system. 

####Actors

In order to become easier to filter **Actions** the stage requires us to register each **Action** with a companion **Actor** which is a **Subject**. Being a **Subject** means that it is both an observer and a publisher. So, in essence they are like filters of action.

####Signallers

These are the **Signal** creators. They register themselved with the **Stage** and can then dispatch **Signals** on to the **Stage**.

####Signals

A **Signal** wrapps an **Action**, a **Message** and a reference to the **Signaller**. They are dispatched on to the stage and then "filtered" by an Actor.

####Messages

A **Message** has a body and a header, which can be of any type. They are the containers to pass data, or reference arround.

####Watcher

These are fancy Observers in that they can subscribe to observsers/subject like Actor and allow managing of these subscriptions.


