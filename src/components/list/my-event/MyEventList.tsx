import MyEventItem from './MyEventItem';

export default function MyEventList() {
  return (
    <ul className="flex flex-col gap-5">
      <MyEventItem />
      <MyEventItem />
      <MyEventItem />
      <MyEventItem />
      <MyEventItem />
    </ul>
  );
}
