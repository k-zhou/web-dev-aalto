import postgres from "postgres";

const sql = postgres();

const MIN_GRADING_VALUE = 1;
const Max_GRADING_VALUE = 3;

const initFeedbackRepository = async () => {
  const kv = await Deno.openKv();
  for (let i = 1; i <= 3; i++) {
    const oldCount = kv.get(["feedbacks", `grading-${i}`]);
    kv.set(["feedbacks", `grading-${i}`], oldCount.value ?? 0);
  }
};

const get = async (i) => {
  const kv = await Deno.openKv();
  return (await kv.get(["feedbacks", `grading-${i}`])).value;
};

const update = async (i) => {
  const kv = await Deno.openKv();
  const oldCount = (await kv.get(["feedbacks", `grading-${i}`])).value;
  if (MIN_GRADING_VALUE <= i && i <= Max_GRADING_VALUE)
    await kv.set(["feedbacks", `grading-${i}`], oldCount + 1);
  return await get(i);
};

initFeedbackRepository();

export { get, update };