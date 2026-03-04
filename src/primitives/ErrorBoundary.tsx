import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="p-6 bg-red-950/50 border border-red-800/60 rounded-lg text-center space-y-3"
        >
          <p className="text-red-300 font-medium">Something went wrong</p>
          <p className="text-red-400/80 text-sm">An unexpected error occurred.</p>
          <button
            onClick={() => this.setState({ error: null })}
            className="px-4 py-2 bg-zinc-800 text-zinc-200 text-sm rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
