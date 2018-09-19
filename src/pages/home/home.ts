import {AfterViewInit, Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {YIFYMovie} from "../../app/interfaces/yify/YIFYMovie";
import {TMDBMovie} from "../../app/interfaces/tmdb/TMDBMovie";
import {MovieService} from "../../app/services/movie.service";

import * as Webtorrent from "webtorrent"
import * as magnet from "magnet-link"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, AfterViewInit{

  public yifyMovies: Array<YIFYMovie> = [];
  public tmdbWeekMovies: Array<TMDBMovie> = [];
  public tmdbDayMovies: Array<TMDBMovie> = [];


  constructor(public navCtrl: NavController, public movieService: MovieService) {}

  ngOnInit() {}

  ngAfterViewInit() {

    this.movieService.getMovies().subscribe(movies => {
      this.yifyMovies = movies;
    });

    this.movieService.getTMDBTrendingMoviesWeek().subscribe(movies => {
      this.tmdbWeekMovies = movies;
    });

    this.movieService.getTMDBTrendingMoviesDay().subscribe(movies => {
      this.tmdbDayMovies = movies;
    })
  }

  stream(movie: TMDBMovie) {
    var client = new Webtorrent();

    this.movieService.getTMDBTorrent(movie).subscribe(result => {

      console.log(result.torrents[0]);


      magnet(result.torrents[0].url, (err, link) => {
        let torrentId = result.torrents[0].url;

        client.add(torrentId, function (torrent) {
          // Torrents can contain many files. Let's use the .mp4 file
          let file = torrent.files.find(file => {
            return file.name.endsWith('.mp4')
          });

          // Display the file by adding it to the DOM.
          // Supports video, audio, image files, and more!
          file.appendTo('.video')
        })
      });
      })
    
  }
}
