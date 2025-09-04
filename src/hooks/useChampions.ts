// src/hooks/useChampions.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface ChampionFull {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: any;
  image: any;
  tags: string[];
  partype: string;
  stats: any;
}

export interface ChampionOption {
  id: string;
  name: string;
}

export const useChampionsFull = (version: string = '13.16.1') => {
  const [champions, setChampions] = useState<ChampionFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );

        // Los datos vienen en response.data.data, con key = championId
        const data = Object.values(response.data.data) as ChampionFull[];
        setChampions(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching champions');
      } finally {
        setLoading(false);
      }
    };

    fetchChampions();
  }, [version]);

  return { champions, loading, error };
};

export const useChampionsOptions = (version: string = '13.16.1') => {
  const [options, setOptions] = useState<ChampionOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );

        const data: ChampionOption[] = Object.values(response.data.data).map(
          (champ: any) => ({ id: champ.id, name: champ.name })
        );

        setOptions(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching champions');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [version]);

  return { options, loading, error };
};
