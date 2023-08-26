import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Center,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { baseurl } from "../../constant";
import Skeletonn from "../../Components/Skeleton";
import axios from "axios";

const QuizComponent = ({endPoint}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);

  useEffect(() => {
    axios.get(`${baseurl+endPoint}`).then((res) => {
      const arr = res.data;
      const shuffledQuestions = shuffleArray(arr);
      setQuestions(shuffledQuestions);
      setIsLoading(false);
    });

    if ("speechSynthesis" in window) {
      setSpeechSynthesisSupported(true);
    }
  }, []);

  const handleOptionClick = (isCorrect, index) => {
    setSelectedOptionIndex(index);
    setIsAnswerCorrect(isCorrect);
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(-1);
    setIsAnswerCorrect(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const shuffledQuestions = shuffleArray(questions);
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const speakQuestion = () => {
    if (speechSynthesisSupported && currentQuestion) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      synth.speak(utterance);
    }
  };

  if (!currentQuestion) {
    return <Text>Quiz completed!</Text>;
  }
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };
  return (
    <VStack
      align="stretch"
      spacing={4}
      p={4}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      {isLoading ? (
        <Skeletonn isLoading={isLoading} />
      ) : (
        <VStack
          //   align="stretch"
          spacing={4}
          width="94vw"
          flex={1}
        >
          <Text fontSize="2xl" fontWeight="bold">
            {currentQuestion.question}
          </Text>
          {speechSynthesisSupported && (
            <Button
              variant="outline"
              colorScheme={useColorModeValue("blue", "blue")}
              onClick={speakQuestion}
              leftIcon={
                <span role="img" aria-label="Speaker">
                  🔊
                </span>
              }
            >
              Read Aloud
            </Button>
          )}
          {currentQuestion.options.map((option, index) => (
  <Button
    key={index}
    variant="solid"
    colorScheme={
      selectedOptionIndex === index
        ? isAnswerCorrect
          ? "green"
          : "red"
        : "blue"
    }
    onClick={() =>
      handleOptionClick(index === currentQuestion.answer, index)
    }
    padding={10}
    opacity={selectedOptionIndex === index ? 1 : 0.8}
    _hover={{ opacity: 1 }}
    transition="opacity 0.3s"
    w="100%" // Set the width to 100% to take full width
    wordBreak="break-word" // Allow long words to wrap to the next line
    justifyContent="flex-start" // Align option content to the start
    textAlign="left" // Align option text to the left
    whiteSpace="normal" // Allow text to wrap to the next line
  >
    {/* Add the option number here */}
    {`${index + 1}. ${option}`}
  </Button>
))}

          {isAnswerCorrect !== null && (
            <Text color={isAnswerCorrect ? "green" : "red"} fontWeight="bold">
              {isAnswerCorrect ? "Correct! 🎉" : "Wrong! 😢"}
            </Text>
          )}
          {isAnswerCorrect !== null && (
            <Button variant="link" onClick={handleNextQuestion}>
              Next Question
            </Button>
          )}
        </VStack>
      )}
    </VStack>
  );
};

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default QuizComponent;
