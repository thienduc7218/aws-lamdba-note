# AWS Lambda
First Launched: 2014+


## What is AWS Lambda?
- Compute Service
- Run code at scale with out worrying about servers
- You write “Functions” - the primary unit of Lambda
- Useful in many applications such as
    - API hosting
    - Event Processing
    - Ad-hoc or timer based jobs

A Typical workflow: Create a Function ==> Write and upload your code ==> Run your function


## Why is Lambda useful?
- No servers to manage
- Autoscaling
- Pay for what you use
- Performance
- other AWS service Integrations
- Easy to use

Region dependent
Architecture arm64 => 20% faster and reduce 20% cost
￼
File name => function name: Handler means the entry point of the fucntion


## A Function Execution

Step 1: Code Download
 - Download code from s3

Step 2: Start Execution Environment
 - Depends on what programming language of the function (Jave > Node.js/Python)

Step 3: Execute Init Code => all piece of code out side the handler function
- Import required libraries
- Extract environment variables from run time and 

Step 4: Execute Handler Code
 - Run code in handler function


There will be 3 scenarios:

- S1: No traffic after a while, everything is tear down => Full cold start if there is no container available => no control here
- S2 : Everything is up and ready to run => After step 3 is done, now it’s called Warm Start
- S3: Lambda still keeps a container done step 1-2 => start from step 3 and it’s called Partial Cold Start 

WARN: Cold Start also occurs while scaling up


## Strategies to minimize cold start: 
- Minimize number of library dependencies
- Only import what you need
- Raise memory configuration => Lambda auto using better CPU to match the configuration of the Memory
-  Utilize Provisioned Concurrency (expensive choice)

## Lambda Concurrency
- New containers are spawned for each concurrent request
- Concurrency is a major scaling consideration and can cause applications to fail due to Throttling 
- Default 1000 units of concurrency per AWS account per region
- When a function get a lot of traffic coming in, it will consume resource from other function in the account in the same region => might cause fail to every single functions due exceeded limit per account

### There are 3 types of concurrency: Unreserved, Reserved and Provisioned
- Unreserved (default): Like a common concurrency pool for every functions. Auto distribute 1000 units to every functions, can consume more if needed but only limit at 1000
-  Reserved: Dedicated concurrency pool. it means we can save a room for a function but it’s also a limit for it. For example, you set always save 200 units for a function, so other function will be in Unreserved with limit 800, but if that function need more than 200, it cannot consume more from other functions and cause Throttling
- Provisioned: keep a number of units to  “always on” status:
    - Very expensive ( 34$/month for 5 units always on)
    - Supports auto scaling policies based on usage
    - Blurs the line between server-less and metal (EC2)
    - It’s common to combine this with Reserved

Limit can be raised via AWS Support Ticket

Lambda Throttling aka RateExceeded: Happens when Lambda rejects a request, when in-flight invocations exceeds available concurrency


## Tips: 
- Set Alarm on throttles for early indicators issues
- Evaluate your concurrency needs and plan accordingly
- Have your clients use Exponential Backoff to avoid retry storms => Sleep a while before retry
- Raising Memory Limit can help but be careful
- Use a small amount of provisioned concurrency to mitigate cold starts for latency sensitive apps

## Version and Aliases
- Version is like git when update a Lambda Function
- Alias can point to exact version we want it and should using like “prod”, “staging”, “dev”
- Version/Aliases weights: “90% traffic into version 1, 10% to Version 2” => useful for version validation prior to full blown deployment

## Lambda Insights?
- Performance Monitoring tool for Lambda
- Collect, aggregates & summarizes system level metrics (CPU, Memory, Network usage)
- Embedded dashboard
How it works?
- By default this is not enabled => enable in config options

## Follow-up

- How would you design a long-running process that exceeds the execution time limit?

- In what scenarios would you use one over the other?

- Suppose one of your Lambda functions is throttling. How would you troubleshoot and resolve it?

- What are the differences in retry behavior for each of these sources, and how do you handle poison messages?

- How does provisioned concurrency impact costs and scalability for high-traffic applications?

- How would you design an error-handling strategy using Dead Letter Queues (DLQs) and EventBridge retries?

- How would you architect a system to handle payloads larger than the 6 MB synchronous invocation limit?

- Suppose you have multiple Lambda functions that share a large set of dependencies. How would you structure your layers to optimize performance and maintainability?

- How would you trace a specific request through a system involving multiple Lambda functions and downstream services?

- How would you ensure that a Lambda function accessing sensitive data adheres to the principle of least privilege?
