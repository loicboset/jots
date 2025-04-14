---
title: 'Learnings as a software engineer'
date: 'April 14, 2025'
---

In this article, I Julien, one of the engineers behind DevLog will share some key learnings from years of building features as a software engineer at my daily job.

---

## Documentation is Key

Starting to document early on in the project is crucial. We generated documents at all stages of our project in order to gather feedback at a technical, product and design level. This helped in aligning with teams, enabling smooth collaboration, and setting a solid foundation for feature development and delivery.

These documents allow close and continuous collaboration between stakeholders from both product, technical and design perspectives from the early stages of feature discovery to the start of implementation. However documentation doesn’t stop there, once the implementation is done, it is equally as important to capture in writing your feature from both product and technical aspects, supported by architectural diagrams and swimlanes, so that stakeholders within the company have a clear reference when interacting with the feature in the future.

## Always communicate

Establishing open communication channels, such as dedicated Slack channels for internal stakeholders, and providing regular updates in order to foster collaboration. Promptly raising blockers and organizing group discussions with colleagues from various competences ensures transparency and helps in addressing challenges effectively. Having an open channel to discuss and update on progress also helped streamline our communication and avoid unnecessary meetings. Having an open channel also serves as an accountability mechanism and a great way to keep track of the conversations and topics over time. The dedicated channel also provides an easy way to share documents and highlight the important ones for quick and easy access by adding them to the channel bookmarks. Our team saved countless hours spent in meetings by setting up and maintaining a dedicated Slack channel from the start.

## Beyond Engineering, think Product

Combine the product and ownership mindset with engineering to ensure alignment is kept between development efforts with the product roadmap. Understanding user needs and product goals ensures that engineering decisions are driven by a customer-centric approach. Through taking ownership of the product, we organized regular demos with stakeholders. These touchpoints were extremely valuable to us, keeping us accountable while also getting early feedback in the process. A better understanding of the product also allowed us to better grasp the potential value and impact of our feature and how to measure impact after the release, in terms of metrics and KPIs. With this mentality, we also better understood the needs of all kinds of stakeholders including internal ones. We baked in mechanisms for easier internal testing and improving Developer experience within the company as a whole. An area often overlooked when building new features.

## Pragmatism in Execution

Striking a balance between quality and efficiency is vital. Having a clear implementation strategy, understanding the release process, and being accountable for milestones helps in delivering high-quality features within set timelines. As an example, we started with the in-app screens while the technical discovery was still ongoing, so that we already had screens to work with when adding the logic. We also took the decision to implement in-memory databases for our models before actually persisting the data once we were fully confident in our data handling and relationships between the different models, thus allowing us to move faster and avoid subsequent unnecessary database migrations.

## Teach, Support, Learn, Repeat

Understand early on your own strengths and weaknesses and how they fit within the dynamics of the team. This way you can optimize the time spent by supporting the rest of the team with what you already know while also sharing this knowledge by teaching others. This can be done via pair programming sessions, hosting frequent and concise knowledge sharing sessions, and fostering a culture of collaborative code reviews. If everyone shares the same mentality, you have the opportunity to learn from others, so seize this moment to expand your knowledge, learn new things, improve on your weaknesses or gaps in knowledge. For example, I learned about different backend strategies to encapsulate logic within service functions and learned to work with redux toolkit for the first time in the client.

## Be smart about your time management

To stay focused on the implementation of complex features while managing daily tasks and duties, developing a structured approach is essential. A strategy used, such as the 3/3/3 method can be particularly effective. (Oliver Burkeman, author of “Four Thousand Weeks: Time Management for Mortals.”) Begin your day with a focused 3-hour deep dive into feature development, followed by accomplishing 3 urgent tasks and then addressing 3 maintenance tasks. This cyclical routine enables you to prioritize your core feature work while ensuring that essential daily tasks are consistently managed. There are days where it is difficult to respect this structure, due to incidents occurring, open investigations or workshops, but this is completely fine. This time management technique only serves as a general path to follow, not as a rigid rule to abide by. It can sometimes be beneficial to break the routine and have a mob programming session or hackathon to dive deeper into a certain topic.

## Don’t overlook code hygiene and maintenance

Adhering to the revered “Leave the code cleaner than how you found it” principle, inspired by the Boy Scout rule outlined in Clean Code, embodies a crucial philosophy for developers. Actively seek opportunities to enhance code quality through refactoring, thereby making it more organized. For instance, our team invested efforts in converting our JavaScript codebase over to TypeScript when files were touched as part of the feature development. We also ensured that existing routes comply with our internal guidelines and software best practices. These represent proactive steps toward maintaining a high standard of code cleanliness. To emphasize this point further, our team experimented with dedicating 2 days each month to maintenance work.

## Don’t forget to enjoy the ride

Last but not least, don’t forget to have fun while learning! Working on a big feature demands a high level of effort and can exert a lot of pressure and stress. Even so, embrace the challenges and be grateful for the opportunities to learn and grow alongside your colleagues. We experienced a major incident following the initial release which was stressful. However we transformed this into an opportunity to dig deeper into the existing code to understand and solve the issue, which also led us to solving longer standing issues.

## Conclusion

These consolidated learnings are a result of me regularly taking notes on what works well for me during feature development, so I can keep track and reflect. Putting these learnings down in writing has helped me consolidate them over time.

If you’re curious about getting started with a developer journal, give DevLog a try. We are striving to build as many useful features, leveraging AI, for you to build the best developer journal for your specific needs. Happy journaling!