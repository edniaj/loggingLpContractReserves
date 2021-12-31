This is my first attempt at using ethers js after learning javascript.

I have written this code to gather all sync() events from the blockchain, sync() events occurs when there is a swap event in a uniswap dex fork. Thus by looking at this particular event, I was able to gather the reserves for token A and token B and the block number - this allows for very useful blockchain analysis where I can monitor the TVL and any movement of reserves since it's inception.



Reflection:
Block finality for some blockchain is too quick i.e. 5 seconds for cronos chain. There was really too many blocks that I have to looked at, thus I felt that I have to run my own node if I wanted to do my own blockchain - analysis - the reason is because RPCs will timed you out if you make too many frequent calls in a short timeframe.

