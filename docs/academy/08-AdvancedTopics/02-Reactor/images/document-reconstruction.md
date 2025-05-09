flowchart LR
    Reactor((Reactor))
    Client -->|Request| Reactor
    Reactor --> Reconst

    subgraph Reconst["Rebuild"]
        Op1[Operation 1] --> Op2[Operation 2]
        Op2 --> Op3[Operation 3]
        Op3 --> OpN[Operation n]
    end
    
    Reconst --> Reactor
    Reactor --> Document
    Document --> Client
    
    