"use client";
import { useState } from "react";
import {runAi} from '@/actions/ai';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardHeader, CardContent} from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

export default function page(){

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try{
      const data = await runAi(query);
      setResponse(data);
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="m-5">
      <form onSubmit={handleClick}>
        <Input className="mb-5" placeholder="Ask Anything" onChange={e => setQuery(e.target.value)}></Input>
        <Button>Generate with AI</Button>
      </form>

      <Card className="mt-5">
        <CardHeader>AI Response</CardHeader>
        <CardContent>
          
          {loading ? <div>Loading...</div> : <div><ReactMarkdown>{response}</ReactMarkdown></div>}
          
        </CardContent>
      </Card>

    </div>
  );
}