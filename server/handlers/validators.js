import { z } from "zod";

const courseValidator = z.object({
  name: z.string().min(3)
});
const questionValidator = z.object({
  title: z.string().min(3),
  text:  z.string().min(3)
});
const noteValidator = z.object({
  text: z.string().min(1)
});

export { 
  courseValidator, 
  questionValidator, 
  noteValidator,
};