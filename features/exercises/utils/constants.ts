import { IExercise } from "./types";

export enum EXERCISE_LEVEL {
  EASY = "Dễ",
  MEDIUM = "Trung bình",
  HARD = "Khó",
}

export const SAMPLE_EXERCISE: IExercise[] = [
  {
    id: "two-sum-001",
    name: "Two Sum",
    statement: `
## Problem Statement

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

### Constraints:
- 2 ≤ nums.length ≤ 10⁴
- -10⁹ ≤ nums[i] ≤ 10⁹
- -10⁹ ≤ target ≤ 10⁹
- Only one valid answer exists.

### Function Signature:
\`\`\`javascript
function twoSum(nums, target) {
    // Your code here
}
\`\`\`

### Input Format:
First line contains the array elements separated by spaces.
Second line contains the target value.

### Output Format:
Return the indices as an array [index1, index2] where index1 < index2.
  `,
    testcase: [
      {
        id: "tc-001",
        input: "2 7 11 15\n9",
        output: "[0,1]",
        isPublic: true,
      },
      {
        id: "tc-002",
        input: "3 2 4\n6",
        output: "[1,2]",
        isPublic: true,
      },
      {
        id: "tc-003",
        input: "3 3\n6",
        output: "[0,1]",
        isPublic: true,
      },
      {
        id: "tc-004",
        input: "1 5 3 7 9 2\n8",
        output: "[0,3]",
        isPublic: false,
      },
      {
        id: "tc-005",
        input: "-1 -2 -3 -4 -5\n-8",
        output: "[2,4]",
        isPublic: false,
      },
      {
        id: "tc-006",
        input: "0 4 3 0\n0",
        output: "[0,3]",
        isPublic: false,
      },
    ],
    level: EXERCISE_LEVEL.EASY,
  },
  {
    id: "valid-parentheses-002",
    name: "Valid Parentheses",
    statement: `
## Problem Statement

Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\`

### Constraints:
- 1 ≤ s.length ≤ 10⁴
- s consists of parentheses only '()[]{}'.

### Function Signature:
\`\`\`javascript
function isValid(s) {
    // Your code here
}
\`\`\`

### Input Format:
A single line containing the string of brackets.

### Output Format:
Return "true" if valid, "false" otherwise.
  `,
    testcase: [
      {
        id: "tc-001",
        input: "()",
        output: "true",
        isPublic: true,
      },
      {
        id: "tc-002",
        input: "()[]{}",
        output: "true",
        isPublic: true,
      },
      {
        id: "tc-003",
        input: "(]",
        output: "false",
        isPublic: true,
      },
      {
        id: "tc-004",
        input: "([)]",
        output: "false",
        isPublic: false,
      },
      {
        id: "tc-005",
        input: "{[]}",
        output: "true",
        isPublic: false,
      },
    ],
    level: EXERCISE_LEVEL.MEDIUM,
  },
];
