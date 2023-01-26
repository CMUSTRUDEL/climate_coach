const line_color = 'rgb(2, 117, 216)';
const dot_color = 'rgb(39, 15, 163)';
// for big projects, we can't fit the entire list of problematic conversations
const num_toxic_to_show = 6;
const last_win = 3;

// declare charts
var compareChart;
var toxic_chart;
var pr_dicussion_chart;
var issue_dicussion_chart;
var pr_time_chart;
var issue_time_chart;
var pr_size_chart;
var issue_size_chart;

// decide what conversations to display
// 0: issue. 1: pr
var toxic_conv_type = 0;
var title;
var metric;
var point_radius = 3;
var hover_radius = 5;
var line_width = 2;

const line_config = {
  type: 'line',
  options: {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        display: false,
    },
    title: {
        display: true,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}}
        }
      }]
    } 
  },
};

const bar_config = {
  type: 'bar',
  fillOpacity: .7,
  options: {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        display: false,
    },
    title: {
        display: true,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}}
        }
      }],
      xAxes: [{
        maxBarThickness: 100
      }]
    } 
  },
};



const timeListSelects = document.querySelectorAll(".timeList");
const commentListSelects = document.querySelectorAll(".commentList");
function listConvers(data) {
    // Display links to conversations
    timeListSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        switch (selector.id) {
            case "i_attention":
                var long_time_convs = document.getElementById('time_consuming_convs');
                long_standings = data[0].long_standing;
                long_time_convs.innerHTML = 'Issues that have been opened for the longest time:<br>';
                long_standings.forEach((long_standing) => {
                    long_time_convs.innerHTML += 
                        '<p class="mb-2"><a href="'+long_standing.url+'">'+long_standing.title+'</a></p>';
                });
                var most_comment_conv = document.getElementById('many_comments_convs');
                most_comments = data[0].most_comments;
                most_comment_conv.innerHTML = 'Open issues with the most comments:<br>';
                most_comments.forEach((most_comment) => {
                    most_comment_conv.innerHTML += 
                        '<p class="mb-2"><a href="'+most_comment.url+'">'+most_comment.title+'</a></p>';
                });
                break;
            case "p_attention":
                var long_time_convs = document.getElementById('time_consuming_convs');
                // console.log(long_standings);
                long_standings = data[1].long_standing;
                long_time_convs.innerHTML = 'Pull requests that have been opened for the longest time:<br>';
                long_standings.forEach((long_standing) => {
                    long_time_convs.innerHTML += 
                        '<p class="mb-2"><a href="'+long_standing.url+'">'+long_standing.title+'</a></p>';
                });
                var most_comment_conv = document.getElementById('many_comments_convs');
                // console.log(long_standings);
                most_comments = data[1].most_comments;
                most_comment_conv.innerHTML = 'Open pull requests with the most comments:<br>';
                most_comments.forEach((most_comment) => {
                    most_comment_conv.innerHTML += 
                        '<p class="mb-2"><a href="'+most_comment.url+'">'+most_comment.title+'</a></p>';
                });
                break;
            default:
                break;
        }
    }));

    commentListSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        switch (selector.id) {
            case "i_most_comments":
                
                break;
            case "p_most_comments":
                
                break;
            default:
                break;
        }
    }));
}



const issueSizeChartSelects = document.querySelectorAll(".issueSizeChartSelect");
const prSizeChartSelects = document.querySelectorAll(".prSizeChartSelect");
const issueTimeChartSelects = document.querySelectorAll(".issueTimeChartSelect");
const prTimeChartSelects = document.querySelectorAll(".prTimeChartSelect");
const issueDisChartSelects = document.querySelectorAll(".issueDisChartSelect");
const prDisChartSelects = document.querySelectorAll(".prDisChartSelect");
const toxicSelect = document.querySelectorAll(".toxicityList");
const compareListSelect = document.querySelectorAll(".compareList");
const comp = document.getElementById('Compare');

function createGraphs(data) {
    issueSizeChartSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        drawChart(data, selector, "issueSizeChart", issue_size_chart);
    }));
    prSizeChartSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        drawChart(data, selector, "prSizeChart", pr_size_chart);
    }));
  
    console.log("here");


    issueTimeChartSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        drawChart(data, selector, "issueTimeChart", issue_time_chart);
    }));
    prTimeChartSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        drawChart(data, selector, "prTimeChart", pr_time_chart);
    }));

    issueDisChartSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        drawChart(data, selector, "issueDisChart", issue_dicussion_chart);
    }));
    prDisChartSelects.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        drawChart(data, selector, "prDisChart", pr_dicussion_chart);
    }));

    // toxicSelect.forEach((selector) =>
    // selector.addEventListener('click', (event) => {
    //     drawChart(data, selector, "toxicity_info", toxic_chart);
    // }));

    compareListSelect.forEach((selector) =>
    selector.addEventListener('click', (event) => {
        drawCompareChart(data, selector, "Compare");
    }));
}

// drop down
function drawCompareChart(data, selector, chart_id){
    console.log(data[2].num_issue_closed);
    switch (selector.id) {
        case "comp_num_active":
            title = "Active Authors (past month)";
            metric = data[2].num_active_authors;
            xtitle = compare_title;
            break;
        case "comp_i_closed":
            title = "Number of Issues Closed (past month)";
            metric = data[2].num_issue_closed;
            xtitle = compare_title;
            break;
        case "comp_p_closed":
            title = "Number of PRs Closed (past month)";
            metric = data[2].num_pr_closed;
            xtitle = compare_title;
            break;
        case "comp_i_time":
            title = "Average Time before Closing Issues (Days)";
            metric = data[2].avg_time_issue;
            xtitle = compare_title;
            break;
        case "comp_p_time":
            title = "Average Time before Closing PRs (Days)";
            metric = data[2].avg_time_pr;
            xtitle = compare_title;
            break;
        default:
            break;
    }

    compare_config = Object.assign({}, bar_config);
    compare_config["data"] = {
        labels: xtitle,
        datasets: [{
            backgroundColor: color_palette,
            borderColor: line_palette,
            borderWidth: 1,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: metric
        }]
    };
    compare_config["options"]["title"]["text"] = title;

    compareChart.destroy();
    compareChart = new Chart(comp, compare_config);
}

function drawChart(data, selector, chart_id, chart_obj)
{
    switch (selector.id) {
        case "u_i_active":
            title = "Active Issue Authors";
            metric = data[0].num_unique_authors;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        case "n_i_active":
            title = "New Issue Authors";
            metric = data[0].num_new_authors;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        case "u_p_active":
            title = "Active Pull Request Authors";
            metric = data[1].num_unique_authors;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        case "n_p_active":
            title = "New Pull Request Authors";
            metric = data[1].num_new_authors;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        case "i_new":
            title = "Number of New Issues";
            metric = data[0].num_open;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        
        case "p_new":
            title = "Number of New Pull Requests";
            metric = data[1].num_open;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        case "i_closed":
            title = "Number of Issues Closed";
            metric = data[0].num_closed;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        case "p_closed":
            title = "Number of Pull Requests Closed";
            metric = data[1].num_closed;
            xtitle = months;
            cur_colour = line_colors[0];
            break;
        case "i_types":
            title = "Number of Issues by Label (in the past week)";
            metric = data[0].label_counts_values;
            xtitle = data[0].label_counts_keys;
            cur_colour = line_colors[0];
            break;
        case "p_types":
            title = "Number of Pull Requests by Label (in the past week)";
            metric = data[1].label_counts_values;
            xtitle = data[1].label_counts_keys;
            cur_colour = line_colors[0];
            break;
        case "i_close_time":
            title = "Median Time for Closing Issues (Days)";
            metric = data[0].median_close_time;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "i_avg_close_time":
            title = "Avg Time for Closing Issues (Days)";
            metric = data[0].avg_close_time;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "p_close_time":
            title = "Median Time for Closing Pull Requests (Days)";
            metric = data[1].median_close_time;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "p_avg_close_time":
            title = "Avg Time for Closing Pull Requests (Days)";
            metric = data[1].avg_close_time;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "i_closed_comments":
            title = "Median Comments for Issues Closed in Each Week";
            metric = data[0].median_comments_before_close;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "i_avg_closed_comments":
            title = "Avg Comments for Issues Closed in Each Week";
            metric = data[0].avg_comments_before_close;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "p_closed_comments":
            title = "Median Comments for Pull Requests Closed in Each Week";
            metric = data[1].median_comments_before_close;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "p_avg_closed_comments":
            title = "Avg Comments for Pull Requests Closed in Each Week";
            metric = data[1].avg_comments_before_close;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "i_open_comments":
            title = "Median Comments for Issues Opened in Each Week";
            metric = data[0].median_comments_recent;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "i_avg_open_comments":
            title = "Avg Comments for Issues Opened in Each Week";
            metric = data[0].avg_comments_recent;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "p_open_comments":
            title = "Median Comments for Pull Requests Opened in Each Week";
            metric = data[1].median_comments_recent;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "p_avg_open_comments":
            title = "Avg Comments for Pull Requests Opened in Each Week";
            metric = data[1].avg_comments_recent;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "i_0_comments":
            title = "Number of Issues Closed with 0 Comments";
            metric = data[0].num_closed_0_comments;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        case "p_0_comments":
            title = "Number of Pull Requests Closed with 0 Comments";
            metric = data[1].num_closed_0_comments;
            xtitle = months;
            cur_colour = line_colors[1];
            break;
        default:
            break;
    }

    line_config["data"] = {
        labels: xtitle,
        datasets: [{
            // label: title,
            backgroundColor: cur_colour,//'rgb(39, 15, 163)',
            borderColor: cur_colour,//line_color,
            fill: false,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: metric
        }],
    };
    line_config["options"]["title"]["text"] = title;

    chart_obj.destroy();
    chart_obj = new Chart(
        document.getElementById(chart_id), line_config);
}

var button_i_6 = document.getElementById("6");
var button_i_5 = document.getElementById("5");
var button_i_4 = document.getElementById("4");
var button_i_3 = document.getElementById("3");

var button_t_6 = document.getElementById("pr_6");
var button_t_5 = document.getElementById("pr_5");
var button_t_4 = document.getElementById("pr_4");
var button_t_3 = document.getElementById("pr_3");

function displayToxic(data, type){
    const toxicMonthSelect = document.querySelectorAll(".issue_toxic_month_selector");
    var month = 5;
    toxicMonthSelect.forEach(function (selector){
        selector.addEventListener('click', (event) => {

        // button_t.classList.remove("active");
        // button_t = document.getElementById("2");
        // button_t.classList.remove("active");
        // button_t = document.getElementById("1");
        // button_t.classList.remove("active");
        
        switch (selector.id) {
            case "6":
                month = 0;
                button_i_6.classList.add("active");
                button_i_5.classList.remove("active");
                button_i_4.classList.remove("active");
                button_i_3.classList.remove("active");
                break;
            case "5":
                month = 1;
                button_i_5.classList.add("active");
                button_i_6.classList.remove("active");
                button_i_4.classList.remove("active");
                button_i_3.classList.remove("active");
                break;
            case "4":
                month = 2;
                button_i_4.classList.add("active");
                button_i_6.classList.remove("active");
                button_i_5.classList.remove("active");
                button_i_3.classList.remove("active");
                break;
            case "3":
                month = 3;
                button_i_3.classList.add("active");
                button_i_6.classList.remove("active");
                button_i_5.classList.remove("active");
                button_i_4.classList.remove("active");
                break;
            // case "2":
            //     month = 4;
            //     break;
            // case "1":
            //     month = 5;
            //     break;
            default:
                month = 3;
                button_i_3.classList.add("active");
                button_i_6.classList.remove("active");
                button_i_5.classList.remove("active");
                button_i_4.classList.remove("active");
                break;
        }
        var toxic_score = document.getElementById("issue_highest_toxic");
        toxic_score.innerHTML = data[0].max_toxic[month];
        var attack_score = document.getElementById("issue_highest_attack");
        attack_score.innerHTML = data[0].max_attack[month];

        var toxic_list = document.getElementById('issue_toxic_links');
        toxic_list.innerHTML = "";
        var toxic_title = document.getElementById("issue_links_to_toxicity");
        toxic_links = data[0].toxic[month];
        if (toxic_links.length == 0) {
            toxic_title.innerHTML = "No comment has a toxicity score above the threshold.";
        }
        else {
            var toxic_count = 1;
            toxic_title.innerHTML = "Links to highest potentially problematic comments (threshold: 0.7):";
            toxic_links.forEach((toxic_link) => {
                toxic_list.innerHTML += 
                    '<p class="m-0 p-0"><a href="'+toxic_link.url+'">'+String(toxic_count)+". "+toxic_link.title+'</a></p>';
                toxic_count = toxic_count + 1;
            });
        }
    })});

    const pr_toxicMonthSelect = document.querySelectorAll(".pr_toxic_month_selector");
    var pr_month = 5;
    pr_toxicMonthSelect.forEach(function (selector){
        selector.addEventListener('click', (event) => {

        // button_t = document.getElementById("pr_2");
        // button_t.classList.remove("active");
        // button_t = document.getElementById("pr_1");
        // button_t.classList.remove("active");
        
        switch (selector.id) {
            case "pr_6":
                pr_month = 0;
                button_t_6.classList.add("active");
                button_t_5.classList.remove("active");
                button_t_4.classList.remove("active");
                button_t_3.classList.remove("active");
                break;
            case "pr_5":
                pr_month = 1;
                button_t_5.classList.add("active");
                button_t_6.classList.remove("active");
                button_t_4.classList.remove("active");
                button_t_3.classList.remove("active");
                break;
            case "pr_4":
                pr_month = 2;
                button_t_4.classList.add("active");
                button_t_6.classList.remove("active");
                button_t_5.classList.remove("active");
                button_t_3.classList.remove("active");
                break;
            case "pr_3":
                pr_month = 3;
                button_t_3.classList.add("active");
                button_t_6.classList.remove("active");
                button_t_5.classList.remove("active");
                button_t_4.classList.remove("active");
                break;
            // case "pr_2":
            //     pr_month = 4;
            //     break;
            // case "pr_1":
            //     pr_month = 5;
            //     break;
            default:
                pr_month = 3;
                button_t_3.classList.add("active");
                button_t_6.classList.remove("active");
                button_t_5.classList.remove("active");
                button_t_4.classList.remove("active");
                break;
        }

        var pr_toxic_score = document.getElementById("pr_highest_toxic");
        pr_toxic_score.innerHTML = data[1].max_toxic[pr_month];
        var pr_attack_score = document.getElementById("pr_highest_attack");
        pr_attack_score.innerHTML = data[1].max_attack[pr_month];

        var pr_toxic_list = document.getElementById("pr_toxic_links");
        pr_toxic_list.innerHTML = "";
        var pr_toxic_title = document.getElementById("pr_links_to_toxicity");
        pr_toxic_links = data[1].toxic[pr_month];
        if (pr_toxic_links.length == 0) {
            pr_toxic_title.innerHTML = "No comment has a toxicity score above the threshold.";
        }
        else {
            var pr_toxic_count = 1;
            pr_toxic_title.innerHTML = "Links to highest potentially problematic comments (threshold: 0.7):";
            pr_toxic_links.forEach((pr_toxic_link) => {
                pr_toxic_list.innerHTML += 
                    '<p class="m-0 p-0"><a href="'+pr_toxic_link.url+'">'+String(pr_toxic_count)+". "+pr_toxic_link.title+'</a></p>';
                pr_toxic_count = pr_toxic_count + 1;
            });
        }
    })});
}
