import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function useCodeGenerator() {
  const [userId, setUserId] = useState(null);

  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    const initUser = async () => {
      try {
        const { data } = await axios.post(`${API_URL}/seed`);
        setUserId(data.id);
        fetchHistory(data.id);
      } catch (error) {
        console.error("Backend offline:", error);
      }
    };
    initUser();
  }, []);

  const fetchHistory = async (uid) => {
    if (!uid) return;
    setIsLoadingHistory(true);
    try {
      const { data } = await axios.get(`${API_URL}/history`, {
        params: { userId: uid, page: 1, limit: 20 },
      });
      setHistory(data.history);
    } catch (error) {
      console.error("History fetch error:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const generateCode = async (prompt, language) => {
    if (!prompt.trim() || !userId) return;

    setIsGenerating(true);
    setCurrentResult(null);

    try {
      const { data } = await axios.post(`${API_URL}/generate`, {
        prompt,
        language,
        userId,
      });

      setCurrentResult(data);
      fetchHistory(userId);
    } catch (error) {
      alert("Failed to generate code.");
    } finally {
      setIsGenerating(false);
    }
  };

  const selectHistoryItem = (item) => {
    setCurrentResult(item);
  };

  return {
    userId,
    history,
    currentResult,
    isGenerating,
    isLoadingHistory,
    generateCode,
    selectHistoryItem,
  };
}
