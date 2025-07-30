import { data } from '../api/data';

function Form() {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <label htmlFor={item.name}>{item.label}</label>
          <input id={item.name} name={item.name} />
          <small>{item.validation}</small>
        </div>
      ))}
    </div>
  );
}

export default Form;
