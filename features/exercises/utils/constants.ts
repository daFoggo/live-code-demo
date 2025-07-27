import { ICodeEditorLanguage, IExercise } from "./types";

export enum EXERCISE_LEVEL {
  EASY = "Dễ",
  MEDIUM = "Trung bình",
  HARD = "Khó",
}

export enum AI_FEEDBACK_MODE {
  FULL_CODE = 0,
  STEP_CODE,
}

export enum STEP_STATUS {
  PASSED = 1,
  NOT_PASSED = 0,
}

export const CODE_EDITOR_LANGUAGES: ICodeEditorLanguage[] = [
  { value: "cpp", label: "C++", extension: "cpp" },
  { value: "python", label: "Python", extension: "py" },
  { value: "javascript", label: "JavaScript", extension: "js" },
  { value: "typescript", label: "TypeScript", extension: "ts" },
  { value: "java", label: "Java", extension: "java" },
  { value: "csharp", label: "C#", extension: "cs" },
  { value: "go", label: "Go", extension: "go" },
  { value: "rust", label: "Rust", extension: "rs" },
];

export const CODE_EDITOR_LANGUAGE_TEMPLATES = {
  cpp: `// Write your C++ solution here
#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
  python: `# Write your Python solution here
def solution():
    # Your code here
    return None`,
  javascript: `// Write your JavaScript solution here
function solution() {
    // Your code here
    return null;
}`,
  typescript: `// Write your TypeScript solution here
function solution(): any {
    // Your code here
    return null;
}`,
  java: `// Write your Java solution here
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  csharp: `// Write your C# solution here
using System;

class Program {
    static void Main() {
        // Your code here
    }
}`,
  go: `// Write your Go solution here
package main

import "fmt"

func main() {
    // Your code here
}`,
  rust: `// Write your Rust solution here
fn main() {
    // Your code here
}`,
};

export const SAMPLE_EXERCISE: IExercise[] = [
  {
    id: "hoc-lai-tin-hoc-co-so-2",
    name: "HỌC LẠI",
    statement: `Môn **Tin học cơ sở 2** của PTIT được biết đến là môn có tỉ lệ sinh viên trượt môn rất cao. Để chuẩn bị tinh thần cho điều đó, các bạn sinh viên muốn tính học phí học lại cho môn học này.

Trong trường hợp sinh viên phải học lại, học phí sẽ được tính theo công thức sau:

$$\\text{Học phí học lại} = 1{,}2 \\times \\text{Học phí gốc} \\times \\text{Hệ số}$$

**Hệ số** sẽ phụ thuộc vào số lượng sinh viên đăng ký học lại theo quy tắc:

- Nếu số lượng sinh viên **ít hơn 10** thì **hệ số = 1,5**
- Nếu số lượng sinh viên **ít hơn 20** thì **hệ số = 1,3**
- Nếu số lượng sinh viên **ít hơn 30** thì **hệ số = 1,1**
- Nếu số lượng sinh viên **từ 30 trở lên** thì **hệ số = 1**

Biết rằng **học phí là 800.000 VNĐ/tín chỉ**, hãy tính học phí học lại mà sinh viên phải đóng nếu biết số lượng sinh viên đăng ký học lại.

**Input**

Một dòng duy nhất chứa số nguyên **N** --- số lượng sinh viên đăng ký học lại **(1 ≤ N ≤ 100)**.

**Output**

Trả về **học phí học lại** mà sinh viên phải đóng.

**Ví dụ**

| **Input** | **Output** |
|-----------|------------|
| 5 | 1440000 VND |
| 10 | 1248000 VND |`,

    function_signature: `def hocLai(n):
    # Your code here
    return None`,

    testcases: [
      {
        id: "test-case-1",
        input: "6",
        output: "1440000 VND",
        isPublic: true,
      },
      {
        id: "test-case-2",
        input: "3",
        output: "1440000 VND",
        isPublic: true,
      },
      {
        id: "test-case-3",
        input: "16",
        output: "1248000 VND",
        isPublic: true,
      },
      {
        id: "test-case-4",
        input: "100",
        output: "960000 VND",
        isPublic: true,
      },
    ],
    example_code: `def hocLai(n):
    if n < 10:
        he_so = 1.5
    elif n < 20:
        he_so = 1.3
    elif n < 30:
        he_so = 1.1
    else:
        he_so = 1
    hoc_phi = 1.2 * 800000 * he_so
    return f"{int(hoc_phi)} VND"`,
    steps: [
      {
        title: "Xác định hệ số học lại",
        description: `Kiểm tra số lượng sinh viên n để xác định hệ số học lại theo quy tắc đã cho:
- Nếu n < 10, hệ số = 1.5
- Nếu n < 20, hệ số = 1.3
- Nếu n < 30, hệ số = 1.1
- Nếu n >= 30, hệ số = 1`,
        code: `if n < 10:
    he_so = 1.5
elif n < 20:
    he_so = 1.3
elif n < 30:
    he_so = 1.1
else:
    he_so = 1`,
      },
      {
        title: "Tính học phí",
        description:
          "Tính học phí dựa vào hệ số và mức học phí mỗi tín chỉ (800.000 VNĐ). Công thức: học phí = 1.2 * 800000 * hệ số.",
        code: "hoc_phi = 1.2 * 800000 * he_so",
      },
      {
        title: "Trả về kết quả",
        description:
          "Sau khi tính toán, trả về kết quả học phí theo định dạng yêu cầu.",
        code: 'return f"{int(hoc_phi)} VND"',
      },
    ],
    level: EXERCISE_LEVEL.EASY,
  },
];
