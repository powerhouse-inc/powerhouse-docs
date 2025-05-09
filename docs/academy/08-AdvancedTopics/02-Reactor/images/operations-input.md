flowchart LR
    Reactor((Reactor))

    ClientA -->|Operations| Reactor
    ClientB -->|Operations| Reactor
    Reactor -->|Apply| Document
    