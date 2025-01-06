// Dans le fichier ButtonDefault.tsx ou ButtonDefault.js (selon votre projet)

type ButtonPropTypes = {
  label: string;
  link: string;
  customClasses: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;  // Ajouter ce type pour onClick
};

const ButtonDefault = ({ label, link, customClasses, onClick }: ButtonPropTypes) => {
  return (
    <button 
      className={customClasses} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonDefault;
