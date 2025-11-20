import { NextResponse } from 'next/server';

type QuoteData = {
  quote: string;
  author: string;
};

const PROGRAMMER_QUOTES: QuoteData[] = [
  { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { quote: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { quote: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { quote: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
  { quote: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
  { quote: "Knowledge is power.", author: "Francis Bacon" },
  { quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.", author: "Dan Salomon" },
  { quote: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.", author: "Antoine de Saint-Exupery" },
  { quote: "Ruby is rubbish! PHP is phpantastic!", author: "Nikita Popov" },
  { quote: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { quote: "Fix the cause, not the symptom.", author: "Steve Maguire" },
  { quote: "Optimism is an occupational hazard of programming: feedback is the treatment.", author: "Kent Beck" },
  { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { quote: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { quote: "I'm not a great programmer; I'm just a good programmer with great habits.", author: "Kent Beck" },
  { quote: "Truth can only be found in one place: the code.", author: "Robert C. Martin" },
  { quote: "If you can't write it down in English, you can't code it.", author: "Peter Halpern" },
  { quote: "A language that doesn't affect the way you think about programming is not worth knowing.", author: "Alan Perlis" },
  { quote: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
  { quote: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
  { quote: "Software is eating the world.", author: "Marc Andreessen" },
  { quote: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", author: "Patrick McKenzie" },
  { quote: "One of my most productive days was throwing away 1000 lines of code.", author: "Ken Thompson" },
  { quote: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.", author: "Brian Kernighan" },
  { quote: "System.out.println(\"Hello World\");", author: "Java" },
  { quote: "console.log(\"Hello World\");", author: "JavaScript" },
  { quote: "print(\"Hello World\")", author: "Python" },
  { quote: "echo \"Hello World\";", author: "PHP" },
  { quote: "fmt.Println(\"Hello World\")", author: "Go" },
  { quote: "It’s not a bug – it’s an undocumented feature.", author: "Anonymous" },
  { quote: "Software undergoes beta testing shortly before it’s released. Beta is Latin for “still doesn’t work”.", author: "Anonymous" },
  { quote: "Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.", author: "Anonymous" },
  { quote: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.", author: "Edsger Dijkstra" },
  { quote: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
  { quote: "Nine people can’t make a baby in a month.", author: "Fred Brooks" },
  { quote: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.", author: "John Woods" },
  { quote: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard" },
  { quote: "C++: The only language in which you can shoot yourself in the foot.", author: "Anonymous" },
  { quote: "There are only two kinds of languages: the ones people complain about and the ones nobody uses.", author: "Bjarne Stroustrup" },
  { quote: "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.", author: "Rick Cook" },
  { quote: "Lisp isn't a language, it's a building material.", author: "Alan Kay" },
  { quote: "Don't comment bad code - rewrite it.", author: "Brian Kernighan" },
  { quote: "Computer science education cannot make anybody an expert programmer any more than studying brushes and pigment can make somebody an expert painter.", author: "Eric S. Raymond" },
  { quote: "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.", author: "Linus Torvalds" },
  { quote: "When I wrote this code, only God and I understood what I was doing. Now, only God knows.", author: "Anonymous" },
  { quote: "Copy-and-Paste was programmed by programmers for programmers actually.", author: "Anonymous" },
  { quote: "Algorithm: Word used by programmers when they don't want to explain what they did.", author: "Anonymous" },
  { quote: "Hardware: The parts of a computer system that can be kicked.", author: "Jeff Pesis" },
];

export async function GET() {
  const randomQuote = PROGRAMMER_QUOTES[Math.floor(Math.random() * PROGRAMMER_QUOTES.length)];
  
  // Add a small artificial delay to simulate network request if needed, 
  // but for internal API it's better to be fast.
  // await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(randomQuote);
}
