## Climate Coach webpage dashboard

- `dashboard` folder contains all the code used to create the webpage.

- `src` folder contains all the code used to collect and analyze data.

- `CHI_2023___Climate_Coach__Appendix.pdf` is the supplement material that contains tables and figures from the paper.

- `code_book.csv` is the code we developed from the think-aloud interviews.

**How to use the code**

Create a file `config.py` that includes the following information:

```
GITHUB_API_TOKEN
GOOGLE_PERSPECTIVE_API_TOKEN
COMPARISON_PROJECT_LIST
PROJECT_SLUG
```

Run `issue_pr_stats.py` to get an `output.json`, which is used by `index.html` in the directory `dashboard` to generate a webpage.

Citation: 

Bib:
```
@inproceedings{qiu2023chi,
  author = {Qiu, Huilian Sophie and Lieb, Anna and Chou, Jennifer and Carneal, Megan and Mok, Jasmine and Amspoker, Emily and Vasilescu, Bogdan and Dabbish, Laura},
  title = {ClimateCoach: A Dashboard for Open-Source Maintainers to Overview
  Community Dynamics},
  booktitle = {International conference of Human-Computer Interaction},
  series = {CHI},
  pages = {},
  publisher = {ACM},
  year = {2023},
  video = {},
  doi = {https://doi.org/10.1145/3544548.3581317}
}
```
