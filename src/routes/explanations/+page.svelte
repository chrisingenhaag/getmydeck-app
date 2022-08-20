<svelte:head>
  <title>GetMyDeck - Calculator</title>
</svelte:head>

<div class="text-sm breadcrumbs not-prose">
  <ul>
    <li><a class="link" href="/">Start</a></li> 
    <li>Explanations</li>
  </ul>
</div>

<h3>Explanations</h3>
<ul>
  <li>GetMyDeck does not predict a date when you might get your order mail from valve.</li>
  <li>GetMyDeck has no information about exact shipment amounts.</li>
  <li>
    GetMyDeck is based on data you or other reddit users share in <a href="https://www.reddit.com/r/SteamDeck" class="link" target="_blank">r/SteamDeck</a> after they
    receive their order mail from valve. <a href="https://www.reddit.com/u/fammy" class="link" target="_blank">u/Fammy</a> collects this data and shares it in a google
    sheet. This google sheet is scraped by GetMyDeck every minute.
  </li>
  <li>
    The collected data only contains the reservation timestamp for each version and each
    region.
  </li>
</ul>
<p>So basically GetMyDeck only knows 3 important things:</p>
<ol>
  <li>
    The time reservations started. This is fixed 1626454800 or Friday, 16. July 2021 17:00:00
    GMT
  </li>
  <li>
    Your data: version (64, 256 or 512 GB), region (US, UK or EU) and your personal
    reservation timestamp
  </li>
  <li>The latest timestamp of someone with same region and version</li>
</ol>
<p>
  Then GetMydeck calculates the amount of time between reservation start and your pesonal
  reservation as well as the amount of time between reservation start and the reservation time
  of the last known user who got his mail already for the selected region and version.
</p>
<h4>Example</h4>
<p>Forget about dates and time for a second</p>
<ul>
  <li>Imaging the Steam Deck reservation start was on second 0</li>
  <li>You placed your reservation after 10 seconds</li>
  <li>Now after the release in march, valve processes orders in a strict ordered queue</li>
  <li>
    A user shares in r/SteamDeck that he got his mail from valve. He shares that he placed his
    reservation 4 seconds after reservation start
  </li>
</ul>
<p>
  GetMyDeck now presents you that you are 40 % of the way there because 40% of the seconds up
  to your reservation timestamp have passed.
</p>
