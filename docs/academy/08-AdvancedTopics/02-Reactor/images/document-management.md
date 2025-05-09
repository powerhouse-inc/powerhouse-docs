flowchart TB
    Reactor((Reactor))
    
    subgraph DriveA["Drive A"]
        DocA[Document A]
        DocB[Document B]
        
        subgraph DocC["Document C"]
            DocC1[Document C-1]
            DocC2[Document C-2]
        end
    end
    
    subgraph DriveB["Drive B"]
        DocD[Document D]
        DocE[Document E]
    end
    
    Reactor --- DriveA
    Reactor --- DriveB
    
    DocA -.-> DocC
    DocB -.-> DocC