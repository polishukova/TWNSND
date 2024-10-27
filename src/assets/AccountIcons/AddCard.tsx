type AddCardType = {
  clasName: string
}
const AddCard: React.FC<AddCardType> = ({ clasName }) => {
  return (
    <svg className={clasName} width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="23" r="23" fill="#0176D3" />
      <path d="M14.75 23H31.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 14.75V31.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default AddCard
