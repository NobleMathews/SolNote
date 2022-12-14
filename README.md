# SolNote
![image](https://user-images.githubusercontent.com/62856848/191882587-90dfed26-77fa-4a4a-87c2-4644d941853b.png)
### Try it out!
[SolNote](https://solnote.netlify.app/#/)

## 💡 Inspiration
- We wanted to harness the power of **Blockchain technology** to help users **share notes** with others anonymously that can be accessed by anyone around the world
- Use decentralization to enable ease of shareability with data being in our own control. Data if gone once we choose to delete it and take off the blockchain
- The users can also see what others have written without knowing other details of the person who shared it
- This ensures anyone can access the notes but cannot corrupt them

## 📝 What it does
- SolNote is a **Blockchain-based note-taking Dapp** using **Solana Blockchain**
- The users can link popular wallets of Solana to write, edit and delete snippets and share them anonymously with the help of Blockchain using a link
- Currently, we have a 500-character limit per note
- Once we reach the limit, the colour changes to red to give a warning
- As long as the user has enough Sol, they can keep adding notes
- The time of the creation of the note will also be recorded
- As long as the file is available on the network, it will be available to anyone in the world with the link
- Snippets can be shared securely and anonymously using SolNote
- It is a decentralized, secure, verified, and anonymous file-sharing system based on the foundations of blockchain technology

## 🖥️ Languages used
- Vue
- JavaScript
- TypeScript
- Rust
- HTML
- CSS

## 🔥 How we built it
- Ideated on what we can build using the Solana Blockchain that solves a real-world problem
- Planned how we can turn our idea into a project
- Made a timeline on how we can divide the tasks & complete it in a short time
- Decided on which languages and frameworks to use for the project
- Start coding!
- Tested it out using **Phantom**
- Solved the challenges we faced
- Yay! Finally, we had **SolNote** working.

## ⚙️ Challenges we ran into
- We both were new to the Blockchain technology
- Get quickly familiar with the Solana Blockchain and use it in a project
- Debugging instructions that were continuously failing to execute on the Blockchain
- We then decided to port over to Anchor API which simplified much of the boilerplate code. But even that was quite vast
- Figuring out heuristics which would work best for this use case and the overall structure of the contract and accounts systems

## 🏅 Accomplishments that we're proud of
- Got familiar with the Solana Blockchain and applied it to make a project in a short time
- Created something from nothing. We both started from scratch, but ended up making it!
- Challenged our brain to find innovative solutions to solve the challenges
- Enjoyed a creative and collaborative week learning a lot of new things together
- Overall, it was a fantastic experience!

## 📖 What we learned
- Got familiar with the Solana Blockchain
- Best practices of using tools like Git & GitHub
- The best practices of pair programming on a project
- How to plan & collaborate to complete a task in a short period of time
- Attention to details
- How to quickly learn a new skill

## 📌 What's next
- Add a feature for allowing users to upload **password-protected private notes**
- Storage Side it would make more sense to use a DSN like arweave when actual currency is involved
- Add a **Pagination feature** as we scale up so that we only query what we require server side. Currently, we are not facing any issues as we are not dealing with a large corpus
- Support for variable-sized content and self-terminating notes. Based on a rent system, we can assign only enough rent to an account such that it deletes itself once a set time is reached when it will become unable to pay the rent
- Support for more varied kinds of content like video, images, voice features and other multimedia
- Add features for **collaboration** and **shared notes**
