interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export function ResetButton({ onClick, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="focus-ring cursor-pointer text-xs underline-offset-4 transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-40"
      style={{ color: "var(--color-text-muted)" }}
    >
      Сбросить
    </button>
  );
}
