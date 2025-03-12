import { useState, useEffect } from "react";

const TOAST_LIMIT = 3; // Se permite más de un toast a la vez
const TOAST_REMOVE_DELAY = 5000; // 5 segundos

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

export function useToast() {
  const [state, setState] = useState({
    toasts: [],
  });

  useEffect(() => {
    const timeouts = new Map();

    state.toasts.forEach((toast) => {
      if (toast.duration === Infinity) return;

      if (!timeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          dismissToast(toast.id);
        }, toast.duration || TOAST_REMOVE_DELAY);

        timeouts.set(toast.id, timeout);
      }
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [state.toasts]);

  function toast({ ...props }) {
    const id = generateId();

    const update = (updatedProps) => {
      setState((state) => ({
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === id ? { ...t, ...updatedProps } : t
        ),
      }));
    };

    const dismiss = () => {
      setState((state) => ({
        ...state,
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    };

    setState((state) => ({
      ...state,
      toasts: [
        { ...props, id, dismiss },
        ...state.toasts,
      ].slice(0, TOAST_LIMIT), // Respetar el límite de toasts activos
    }));

    return { id, dismiss, update };
  }

  function dismissToast(id) {
    setState((state) => ({
      ...state,
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  }

  return {
    toast,
    toasts: state.toasts,
    dismissToast,
  };
}
