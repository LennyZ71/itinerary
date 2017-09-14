﻿using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Details.Entities
{
  public class AddressComponent
  {
    [JsonProperty(propertyName: "long_name")]
    public string LongName { get; set; }

    [JsonProperty(propertyName: "short_name")]
    public string ShortName { get; set; }

    [JsonProperty(propertyName: "types")]
    public string[] Types { get; set; }
  }
}
