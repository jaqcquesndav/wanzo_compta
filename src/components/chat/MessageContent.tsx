import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Plot from 'react-plotly.js';
import { Edit2, Copy, Download, ZoomIn, BarChart, LineChart, PieChart } from 'lucide-react';
import { Button } from '../ui/Button';

interface MessageContentProps {
  content: string;
  onEdit?: (content: string) => void;
}

interface CodeBlock {
  language: string;
  code: string;
}

interface ChartData {
  type: 'bar' | 'line' | 'pie';
  data: any;
}

export function MessageContent({ content, onEdit }: MessageContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [selectedChartType, setSelectedChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [isZoomed, setIsZoomed] = useState(false);

  // Détecter le type de contenu
  const hasCode = content.includes('```');
  const hasMath = content.includes('$');
  const hasChart = content.includes('```chart');

  const extractCodeBlocks = (markdown: string): CodeBlock[] => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks: CodeBlock[] = [];
    let match;

    while ((match = codeBlockRegex.exec(markdown)) !== null) {
      blocks.push({
        language: match[1] || 'text',
        code: match[2].trim()
      });
    }

    return blocks;
  };

  const parseChartData = (code: string): ChartData | null => {
    try {
      const data = JSON.parse(code);
      return {
        type: 'bar',
        data
      };
    } catch {
      return null;
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadChart = (chartData: any) => {
    const blob = new Blob([JSON.stringify(chartData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveEdit = () => {
    onEdit?.(editedContent);
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <div className="space-y-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-32 p-2 border rounded-md"
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEdit}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              if (inline) {
                return <code className="bg-gray-100 px-1 rounded" {...props}>{children}</code>;
              }

              if (language === 'chart') {
                const chartData = parseChartData(String(children));
                if (!chartData) return null;

                return (
                  <div className="relative">
                    <div className="absolute top-2 right-2 flex space-x-2 z-10">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={ZoomIn}
                        onClick={() => setIsZoomed(!isZoomed)}
                      >
                        {isZoomed ? 'Réduire' : 'Agrandir'}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Download}
                        onClick={() => handleDownloadChart(chartData.data)}
                      >
                        Données
                      </Button>
                      <div className="flex space-x-1">
                        <Button
                          variant={selectedChartType === 'bar' ? 'primary' : 'secondary'}
                          size="sm"
                          icon={BarChart}
                          onClick={() => setSelectedChartType('bar')}
                        />
                        <Button
                          variant={selectedChartType === 'line' ? 'primary' : 'secondary'}
                          size="sm"
                          icon={LineChart}
                          onClick={() => setSelectedChartType('line')}
                        />
                        <Button
                          variant={selectedChartType === 'pie' ? 'primary' : 'secondary'}
                          size="sm"
                          icon={PieChart}
                          onClick={() => setSelectedChartType('pie')}
                        />
                      </div>
                    </div>
                    <div className={isZoomed ? 'fixed inset-4 z-50 bg-white p-4 shadow-xl rounded-lg' : ''}>
                      <Plot
                        data={[{
                          ...chartData.data,
                          type: selectedChartType
                        }]}
                        layout={{
                          autosize: true,
                          margin: { t: 60, r: 10, l: 60, b: 40 },
                          paper_bgcolor: 'transparent',
                          plot_bgcolor: 'transparent'
                        }}
                        style={{ width: '100%', height: isZoomed ? '90vh' : '400px' }}
                        config={{ responsive: true }}
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div className="relative group">
                  <button
                    className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopyCode(String(children))}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{ margin: 0 }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            },
            p({ children }) {
              // Gérer les expressions mathématiques inline
              if (typeof children === 'string' && children.includes('$')) {
                const parts = children.split(/(\$.*?\$)/g);
                return (
                  <p>
                    {parts.map((part, i) => {
                      if (part.startsWith('$') && part.endsWith('$')) {
                        return (
                          <InlineMath key={i}>
                            {part.slice(1, -1)}
                          </InlineMath>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              }
              return <p>{children}</p>;
            }
          }}
        >
          {content}
        </ReactMarkdown>

        {onEdit && (
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </Button>
        )}
      </div>
    );
  };

  return renderContent();
}