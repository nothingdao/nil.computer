export default function TokenChartNavigation() {
  return (
    <div>
      <ul className="menu menu-sm lg:menu-horizontal border border-neutral mb-6">
        <li><a>1m</a></li>
        <li><a>30m</a></li>
        <li>
          <details open>
            <summary>1h</summary>
            <ul>
              <li><a>2h</a></li>
              <li><a>4h</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>1d</summary>
            <ul>
              <li><a>7d</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>1m</summary>
            <ul>
              <li><a>3m</a></li>
              <li><a>6m</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
}
