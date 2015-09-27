# Flow
A react flux inspired library as a thin layer on top of Rx to facilitate the construction of "shape-shifting" architectures.

Based on the ideas of React Flux with uni directional messaging flowing. 

**Flow**, provides a **Stage** in which **Actions** are registered with an **Actor**.

###########################

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


