import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import { baseurl } from "../constant";
import axios from "axios";

const ProjectCategory = ({ title, projects }) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel py={4}>
      {Array.isArray(projects) &&
        projects?.map((project, index) => (
          <Box key={index} p={4} bg="white" boxShadow="md" rounded="md" mt={3}>
            <Heading color='black' size="md" mb={2}>
              {project.title}
            </Heading>
            <Text color='black'>{project.description}</Text>
          </Box>
        ))}
    </AccordionPanel>
  </AccordionItem>
);

const ProjectsPage = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get(`${baseurl}uimachinecoding`).then((res) => {
      const arr = res.data;
      console.log(arr, "arrr");
      setdata(arr);
    });
  }, []);
  return (
    <Container maxW="lg" py={10}>
      <Heading as="h1" size="xl" mb={6}>
        Project Ideas
      </Heading>
      <Accordion allowToggle>
        <ProjectCategory title="Easy" projects={data.easy} />
        <ProjectCategory title="Medium" projects={data.medium} />
        <ProjectCategory title="Hard" projects={data.hard} />
      </Accordion>
    </Container>
  );
};

export default ProjectsPage;
