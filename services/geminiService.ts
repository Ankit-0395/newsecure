
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { ScanResult, Severity, Dependency, Vulnerability } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCodeSecurity = async (code: string, fileName: string, policies: string[] = ['OWASP']): Promise<ScanResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Deep Security Audit for "${fileName}". 
      Policies: ${policies.join(', ')}.
      Analyze vulnerabilities and generate an "Attack Path" showing the blast radius.
      
      Code:
      ${code}`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallRiskScore: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            vulnerabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
                  description: { type: Type.STRING },
                  fixSuggestion: { type: Type.STRING },
                  remediationCode: { type: Type.STRING }
                },
                required: ["type", "severity", "description", "fixSuggestion", "remediationCode"]
              }
            },
            attackPath: {
              type: Type.OBJECT,
              properties: {
                nodes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      type: { type: Type.STRING, enum: ["entry", "vulnerability", "target"] },
                      threatLevel: { type: Type.INTEGER }
                    }
                  }
                },
                links: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      source: { type: Type.STRING },
                      target: { type: Type.STRING },
                      description: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          },
          required: ["overallRiskScore", "summary", "vulnerabilities", "attackPath"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      fileName,
      ...data,
      vulnerabilities: data.vulnerabilities.map((v: any) => ({
        ...v,
        id: Math.random().toString(36).substr(2, 5),
        status: 'Open'
      }))
    };
  } catch (error) {
    console.error("AI Scan failed:", error);
    throw new Error("Security Engine failure.");
  }
};

export const verifyPatch = async (originalCode: string, patch: string): Promise<{ verified: boolean, reasoning: string }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compare original code and patch. Does the patch resolve the security vulnerability without introducing regressions?
    Original: ${originalCode}
    Patch: ${patch}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verified: { type: Type.BOOLEAN },
          reasoning: { type: Type.STRING }
        },
        required: ["verified", "reasoning"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const analyzeDependencies = async (manifestContent: string): Promise<Dependency[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze: ${manifestContent}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              version: { type: Type.STRING },
              status: { type: Type.STRING, enum: ["secure", "vulnerable", "warning"] },
              latestVersion: { type: Type.STRING },
              riskReason: { type: Type.STRING },
              cve: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (e) { return []; }
};

export const createSecurityChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: { systemInstruction: 'Expert SOC Orchestrator. Final Stage active.' },
  });
};
