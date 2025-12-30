# Interview Questions for Profile Page

Answer these questions in your own voice—ramble if you want, be specific, skip the corporate filter. The goal is to capture how you actually think and talk, so the page sounds like you.

---

## 1. The Contrarian Take

What's a belief you hold about AI in software development that most people in your position would disagree with? Or something you've changed your mind about recently?

> **How this affects the website:** This will replace generic AI statements in "The Shift" section with a genuine, differentiated perspective. Right now it reads like every other AI thought leader. Your actual opinion will make it stand out.

**Your answer:**

Engineering has always been changing. We started with punch cards and continued with assembler. Then we introduces higher order programming languages, functional and object oriented programming, etc and raised the level of abstraction. Then we started using libraries, preferably open source to raise the abstraction level again. The possibility to read the code gives us a sense of control and assurance. However, most of will not read the code of every library that we use, some of us will not read the code of any library. We trust metadata like github stars, open issues, the date of the last change. We use audit tools, we regularly update to the latest version of libraries, assuming that the features got more and better and then bugs got less.

We are used to trusting the system and we are writing tests for our use cases.

We are now facing the next level of abstraction. Generative AI, generating code based on our instructions. Like open source libraries, we can still read the code and currently we do. But once we build trust, will we still read the code?

We could write test, to make sure the generated code does what it should, but why bother, when it is so much faster and easier to also have the tests generated?

We could manually test the implementation, but why bother, when we can enable our coding agent to access the browser and “manually” test the result?

We could ensure that our code works before we make a pull request with our changes, but why bother, when the reviewer will do it for us?

We could review the pull request we are assigned to review, but why bother, when we can just ask the coding agent to do the review?

Once no human has looked over any part of the code, do we still trust it?

Maybe the better question is: Do human really still write better code than AI? And if so, all of them or just some? All the time or just sometimes?

If you are an engineer today, these questions matter, because we are seeing our profession change right in front of our eyes and we need to redefine our role and the part we are playing in this change.

# The Engineer

If you are seeing our profession change right in front of our eyes, what do you do?

I would argue the best thing is to reflect and adapt.

Engineering has always been tied to life-long learning, so we are used that this and we expected things to change when we started our careers, no matter how long ago that was.

Technically, your job is still the same as it was since the beginning.

As an engineer, your job is to deliver code that you have proven to work.

Depending where you work that might be the full picture or only part of your job. There is a value chain in your work place and you writing code usually sits somewhere in the middle of the value chain. Before you start writing, there is usually someone identifying the problem the software should solve and defining the solution that we are anticipating for it. Often this is the job of the product owner. After you finished and delivered code that works, there is usually a roll-out process, customer service and sales.

Similarly, the process of producing code that works is also a multi step process. It usually starts with understanding the problem and the proposed solution. We then break down the solution and define the architecture and implementation steps to build that solution. Then - usually incrementally - we build the solution, manually test each step, learn about the edge cases while we are building. We write tests for the happy cases and the edge cases before, while or after we are building. When we believe we are done, we manually try all the cases again, we try to break it. We constantly think about all the things that go wrong and adjust our code. We give it a final check and make a pull request. When we review code, we do the same steps again. We read the code and understand each line. We check the test cases and ensure that happy paths and edge cases are covered. We run the implementation and we try to break it. We do all this, to prove to ourselves that the code we are delivering - as author or as reviewer - works!

Now along comes AI and changes everything.

Suddenly we have a buddy that knows more and less than us. He knows more about coding. Different languages, best practices, architectures. The kind of knowledge you get from reading a lot of code. But his knowledge is a little outdated and he almost instantly forgets everything we are trying to teach him. He has never really build anything. At least he can’t remember.

Suddenly we find ourselves in a completely different position. Because our buddy is super smart if he gets the right instructions, he can be of great help if we figure out how to give him the right instructions. We are now not writing code anymore. We are telling an AI how it should be writing code on our behalf. We need to learn what it knows and what it does not know. What it remembers and what it forgets. How to make it remember and how to direct it to reach the best results.

Suddenly our code becomes better and worse at the same time. Better, because it now effortlessly covers all the quirks and edge cases that we spent so much time finding before. Worse, because it now also cover edge cases that will never happen, things are in the wrong places, our best practices are only respected sometimes, documentation is everywhere and describes the what, not the why, things are “backwards compatible” in self-contained code-bases, … and so on.

For us that means our job is changing. Knowing the language and frameworks we use insight out key differentiator. Now someone knows more … everything, at least until the cut-off date. If he doesn’t he can read a lot faster than us. Currently, knowledge is still key, but only to control and challenge the solution the AI builds for us.

Understanding the context and being able to verify the results the AI creates are key now. We steer our junior developer that has read a lot of code, but knows nothing about our product, our users, our revenue, our roadmap, … We might even steer 2, 3, … or 10 of those agents. Context switching and multitasking are becoming the new normal. Being in the flow becomes less valuable. These days everything is fast and getting faster.

It is hard to keep up.

So how do we keep up?

The key is to make the AI for for us. Share our knowledge and provide the context it needs for the job. Currently the codebase is the only context it has apart from our instructions. If you allow it, it might read the ticket that it is supposed to be working on.

build code bases for AI

add and maintain documentation about the why

add rules and instructions for the ai to follow

document your best practices and architecture for the AI

make it easy to write and refactor your code

follow commonly established best-practices

keep your code simple

keep your folder structure simple

cherish and nurture your tests, they are your ultimate lifeline

build documentation for AI

if you are building tools, frameworks, apis, make your docs ai readable

I will expand. Soon it will read your tickets in linear, your notes in notion, it will join your meetings, read the transcripts, watch the recordings. It is already creating simple memories that capability will grow and expand. Eventually it might have more context than you, because it ready very fast and it has full text search.

For a while, you will still be steering it. You will define what is valuable, because your users are humans. Unless they are not. APIs and frameworks are already consumed by AI and by code that is AI written. If your app still has a user interface ask yourself: why does the user need to do this manually? If you don’t have a good reason, your UI might be gone soon and an AI will consume your API and your API documentation.

For now, make sure AI can use your code base. If you want to stay relevant, you need to iterate fast. I.e. you need to iterate faster than your competition. And they are using AI, you can be certain about that.


---

## 2. The Specific Story

Tell me about a specific moment when you saw an engineer on your team "get it" with AI tools—or completely resist it. What happened? What did you learn from watching that?

> **How this affects the website:** This becomes a concrete example in "The Shift" or "About" section. Stories are memorable; abstract claims are not. One good anecdote is worth ten bullet points.

**Your answer:**
see 1.


---

## 3. Your Actual Headline

The current hero says: "I lead engineering teams through the AI transformation—building codebases that work with AI tools, and helping engineers adapt without losing their craft."

If you had to introduce yourself at a conference or to a new colleague, what would you actually say? Don't overthink it.

> **How this affects the website:** This directly rewrites the Hero section headline—the first thing people read. It needs to sound like you said it, not like an AI wrote it.

**Your answer:**
I have been researching human-computer interaction and distributed artificial intelligence for the last 20 years. Afterwards, I have been working in various berlin-based startups and medium to large companies, building mobile apps and iot platforms. I have also been working as a freelance consultant, helping startups and companies with their technical challenges. Most recently, I have been leading the software engineering team at CHAPTR, building AI-powered products for the publishing industry. I strongly believe that AI will transform the profession of software development. It will not replace developers, but if you master the tools, you will be able to do more in less time.

---

## 4. The CHAPTR Reality

Forget the corporate description. What are you actually building at CHAPTR? What's the problem you're solving, and why did you take this job specifically?

> **How this affects the website:** This rewrites the Hero supporting text and the CHAPTR entry in the Timeline. "AI-powered products for publishers" is vague. What you actually do is more interesting.

**Your answer:**
At chaptr, I am mostly working on the reedy product (reedy.ai). A platform that ingests book metadata and utilizes AI to improve the metadata. We optimize for quality and best possible search results on platforms like amazon. We also look into generating additional assets based on the metadata as well as the content of the book. Finally, we make the large database of books searchable, also semantically.


---

## 5. The Hidden Wins

What's something from your career that you're genuinely proud of that wouldn't make it onto a typical resume or LinkedIn profile? Something that shows who you are?

> **How this affects the website:** This adds personality to the Timeline entries. Right now they read like job descriptions. One specific detail per role makes them human.

**Your answer:**
I founded sustainability drinks, a non-profit organization that organizes sustainability events in berlin. We were a group of volunteers that are passionate about sustainability and want to make a difference.
I also worked for a startup that was founded by Christopher Schläfer, a former executive of deutsche telekom.
I built multiple mobile apps from scratch. I thrive in greenfield projects.

---

## 6. The Pet Peeve

What makes you roll your eyes when you hear other people talk about AI and engineering leadership? What's overblown, misunderstood, or just wrong?

> **How this affects the website:** This informs the overall tone—what to avoid saying. It also might become a line in "The Shift" section that signals you're not just echoing the hype.

**Your answer:**
People are talking about AI slop. This is temporary and a lot of people do not get the bigger picture of how AI will change the profession.


---

## 7. The GreenBuzz Thread

You've been involved with sustainability through GreenBuzz Berlin for years. Is this connected to your tech work, or a separate part of your life? What drove you to start it?

> **How this affects the website:** This shapes the "Non-Profit Work" Timeline entry. Right now it feels disconnected. If there's a throughline, it makes the whole page more coherent.

**Your answer:**
It is separate. I worked at yetu and we had to spent 10% of our work time in a social project of our choice. I started greenbuzz berlin (originally sustainability drinks), together with Florian weingarten.


---

## 8. The PhD Translation

Your PhD was on "multimodal interaction in smart environments." Can you explain what that actually means in plain language? And does any of it connect to what you do now with AI?

> **How this affects the website:** This rewrites the "Academic Foundations" Timeline entry and potentially adds depth to why you're credible on AI. Right now "Distributed AI" is just a credential. Making it concrete adds credibility.

**Your answer:**
We were researching how to build adaptive user interfaces that could be used on multiple different devices like mobile phones, tablets, desktop computers, smart watches, smart homes, etc. as well as with different modalities like voice, touch, gestures, remote controls, etc.

Generative UI is a big topic again and agents generating the user interfaces dynamically, tailored to the user, the task and the context of use is practically in reach now (and was out research topic back then).


---

## 9. What You Actually Focus On

The "Areas of Focus" section lists things like "Development workflows optimized for human-AI collaboration." Which of these do you spend the most time on right now? Which ones are more theoretical?

> **How this affects the website:** This reorders or rewrites the Expertise section to lead with what you actually do daily, not what sounds impressive. Authenticity > comprehensiveness.

**Your answer:**
I focus on the developer experience. How to ensure everyone can deliver their best work. How to best utilize AI tools and how to structure the code-base to ensure quality. Also how to build team and company culture that enables developers to build great products. I work with the product team to define the roadmap and the features and then I work with the engineering team to define the technical implementation.

**Responsibilities:**

- Lead engineering teams, ensuring quality, efficiency, and best practices.
- Manage project timelines, resource allocation, and delivery milestones.
- Bridge the gap between product and technology teams.
- Improve engineering processes and maintain a high-performance culture.
- Mentor and support engineers in their career growth.
- Ensure code quality, system reliability, and technical debt management.

**Expectations:**

- Experience managing software teams in an agile environment.
- Strong understanding of software architecture and development best practices.
- Ability to align engineering goals with business needs.
- Skilled in hiring, mentoring, and performance management.

---

## 10. The Dinner Party Test

You're at a dinner party. Someone asks "So what do you do?" and you have about 30 seconds before their eyes glaze over. What do you say?

> **How this affects the website:** This becomes the meta description, the LinkedIn preview, and possibly a tighter Hero subheadline. It's the shortest version of your story that still sounds like you.

**Your answer:**
I work in a startup within the holtzbrink publishing group. We are the AI strategy of Holtzbrink.


---

## Bonus: Anything Missing?

Is there something about how you work, what you care about, or who you are that we haven't touched on? Something that should probably be on the page but isn't?

> **How this affects the website:** This catches blind spots—things I can't know to ask about but that might be central to your identity.

**Your answer:**

Something personal maybe? I used to live in berlin and now I move out of the city. I live in a small village near Neuruppin and we have a bunch of chickens. I enjoy skiing, mountainbiking, climbing. I travelled the world for 2 years after I finished my PhD. I am a certified ski instructor.

