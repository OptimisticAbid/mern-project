import React, { useState } from "react";

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function shortenUrl() {
    setLoading(true);
    setError("");
    setShortUrl("");
    try {
      const res = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: longUrl,
          customAlias: alias || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to shorten URL");

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          🔗 URL Shortener
        </h1>

        <input
          type="url"
          placeholder="Enter your long URL..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          placeholder="Optional custom alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={shortenUrl}
          disabled={loading || !longUrl}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between border">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium truncate max-w-[70%]"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="p-2 text-indigo-600 hover:text-indigo-800"
            >
              {copied ? "✅" : "📋"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
