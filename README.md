# Flow
A react flux inspired library as a thin layer on top of Rx to facilitate the construction of s "shape-shifting" architecture.

Based on the ideas of React Flux with uni directional messaging flowing. 

**Flow**, provides a **Stage** in which **Actions** are registered with an **Actor**.

#####Actions

**Actions** are simply unique identifiers on a **Stage** they represent an action on the system. 

#####Actors
In order to become easier to filter **Actions** the stage requires us to register each **Action** with a companion **Actor**
which is a **Subject**. Being a **Subject** means that it is both an observer and a publisher. So, in essence they are like filters.

#####Signallers

These are the **Signal** creator. They register with the **Stage** and can then dispatch **Signals** on to the **Stage**.

#####Signals

A **Signal** wrapps an **Action**, a **Message** and a reference to the **Signaller**. They are dispatch on the stage and then "filtered" by an Actor.

#####Watcher

These are fancy Observers in that they can subscribe to observsers/subject like Actor and manage these subscriptions.


