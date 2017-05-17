﻿using Itinerary.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Itinerary.DataAccess.EntityFramework.Configurations
{
  internal static class PlacePlaceCategoryConfig
  {
    public static void Configure( this EntityTypeBuilder<PlacePlaceCategory> entity )
    {
      entity.HasKey( x => x.Id );

      entity.HasOne( x => x.Place )
            .WithMany( x => x.Categories )
            .HasForeignKey( x => x.PlaceId );

      entity.HasOne( pt => pt.Category )
            .WithMany( x => x.Places )
            .HasForeignKey( x => x.CategoryId );

      entity.ToTable( "PlacePlaceCategories" );
    }
  }
}
