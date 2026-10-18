"use client";

import { useState } from "react";
import type { PublishedClassroomQuestion } from "@/data/published-classrooms";

export function CourseUnderstandingQuiz({
  questions,
  locale,
}: {
  questions: PublishedClassroomQuestion[];
  locale: "zh" | "en";
}) {
  const zh = locale === "zh";
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const complete = questions.every((q) => selected[q.id]?.length);
  const correct = (q: PublishedClassroomQuestion) => {
    const values = selected[q.id] ?? [];
    return values.length === q.answer.length && q.answer.every((a) => values.includes(a));
  };
  const score = questions.filter(correct).length;
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {questions.map((question, index) => (
        <fieldset
          key={question.id}
          className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 text-slate-900"
        >
          <legend className="max-w-full px-2 text-lg font-bold">
            {index + 1}. {question.question}
          </legend>
          <div className="mt-2 grid gap-3">
            {question.options.map((option) => (
              <label
                key={option.value}
                className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm leading-7"
              >
                <input
                  className="mt-2"
                  type={question.type === "multiple" ? "checkbox" : "radio"}
                  name={question.id}
                  disabled={submitted}
                  checked={(selected[question.id] ?? []).includes(option.value)}
                  onChange={() =>
                    setSelected((current) => {
                      const previous = current[question.id] ?? [];
                      return {
                        ...current,
                        [question.id]:
                          question.type === "multiple"
                            ? previous.includes(option.value)
                              ? previous.filter((v) => v !== option.value)
                              : [...previous, option.value]
                            : [option.value],
                      };
                    })
                  }
                />
                <span>
                  <strong>{option.value}. </strong>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          {submitted && (
            <div
              role="status"
              className="mt-4 space-y-2 rounded-lg bg-slate-50 p-4 text-sm leading-7"
            >
              <p className="font-bold">
                {correct(question)
                  ? zh
                    ? "回答正确"
                    : "Correct"
                  : zh
                    ? "请查看解析"
                    : "Review the explanation"}{" "}
                · {zh ? "答案" : "Answer"}: {question.answer.join(", ")}
              </p>
              <p>{question.analysis}</p>
              {question.optionFeedback && (
                <dl>
                  {question.options.map((option) => (
                    <div key={option.value} className="mt-2">
                      <dt className="font-bold">{option.value}</dt>
                      <dd>{question.optionFeedback![option.value]}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-4">
        {!submitted ? (
          <button disabled={!complete} onClick={() => setSubmitted(true)}>
            {zh ? "提交答案" : "Submit answers"}
          </button>
        ) : (
          <>
            <p role="status" className="font-bold">
              {zh ? "得分" : "Score"}: {score} / {questions.length}
            </p>
            <button
              onClick={() => {
                setSelected({});
                setSubmitted(false);
              }}
            >
              {zh ? "重新答题" : "Try again"}
            </button>
          </>
        )}
        {!complete && !submitted && (
          <p>{zh ? "请完成全部四题后提交。" : "Answer all four questions before submitting."}</p>
        )}
      </div>
    </div>
  );
}
